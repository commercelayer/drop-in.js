import { createClient, getAccessToken } from '#apis/commercelayer/client'
import { getConfig, getOrganizationConfig } from '#apis/commercelayer/config'
import { fireEvent } from '#apis/event'
import { getKeyForCart } from '#apis/storage'
import type {
  AddItem,
  TriggerCartUpdate,
  TriggerHostedCartUpdate
} from '#apis/types'
import { pDebounce } from '#utils/debounce'
import { jwtDecode } from '@commercelayer/js-auth'
import { type Core, core } from '@commercelayer/js-sdk'
import Cookies from 'js-cookie'
import memoize from 'lodash/memoize'

/**
 * Create a draft order.
 * @see https://docs.commercelayer.io/core/v/how-tos/shopping-cart/create-a-shopping-cart
 * @returns Returns the created draft order.
 */
async function createEmptyCart(): Promise<Core.Order> {
  const config = getConfig()
  const client = await createClient(config)
  const token = await getAccessToken(config)

  const order = await client.request(
    core.createItem('orders', {
      return_url: config.orderReturnUrl,
      language_code: config.languageCode
    })
  )

  if (token.type === 'guest') {
    setCartId(order.id)
  }

  await triggerCartUpdate()

  return order
}

const LINE_ITEMS_SHIPPABLE = ['skus', 'bundles'] as const
const LINE_ITEMS_SHOPPABLE = [...LINE_ITEMS_SHIPPABLE, 'gift_cards'] as const

export function isValidForCheckout(order: Core.Order): boolean {
  return (
    order.line_items?.find((lineItem) => {
      return LINE_ITEMS_SHOPPABLE.includes(
        lineItem.item_type as (typeof LINE_ITEMS_SHOPPABLE)[number]
      )
    }) !== undefined
  )
}

function removeCartId(): void {
  const config = getConfig()
  Cookies.remove(getKeyForCart(config))
}

function setCartId(cartId: string): void {
  const config = getConfig()
  Cookies.set(getKeyForCart(config), cartId)
}

function getCartId(): string | null {
  const config = getConfig()
  return Cookies.get(getKeyForCart(config)) ?? null
}

export async function isValidUrl(url: string): Promise<boolean> {
  const cartId = (await getCart())?.id

  return cartId != null && url.includes(`/${cartId}?`)
}

/**
 * Get the Hosted Cart url.
 * @param forceCartToExist When true it will create an empty cart if not existing before.
 * @returns Returns the Hosted Cart url.
 */
export async function getCartUrl(
  forceCartToExist: boolean = false
): Promise<string> {
  let cartId = (await getCart())?.id

  if (cartId === undefined && forceCartToExist) {
    const cart = await createEmptyCart()
    cartId = cart.id
  }

  const organizationConfig = await getOrganizationConfig({
    orderId: cartId ?? 'null'
  })

  return organizationConfig.links.cart
}

export async function getCheckoutUrl(): Promise<string | undefined> {
  const cart = await getCart()

  if (cart === null || !isValidForCheckout(cart)) {
    return undefined
  }

  const organizationConfig = await getOrganizationConfig({
    orderId: cart.id ?? 'null'
  })

  return organizationConfig.links.checkout
}

export async function _getCart(): Promise<Core.Order | null> {
  const config = getConfig()
  const client = await createClient(config)
  const token = await getAccessToken(config)

  const orderParams: Core.ReadItemQuery<'orders'> = {
    include: {
      line_items: {
        line_item_options: {
          sku_option: {}
        },
        item: {}
      }
    }
  }

  if (token.type === 'guest') {
    const orderId = getCartId()

    if (orderId === null) {
      return null
    }

    const order = await client.request(
      core.readItem('orders', orderId, orderParams)
    )

    if (order?.editable === false) {
      removeCartId()
      return null
    }

    return order
  }

  const jwt = jwtDecode(token.accessToken)

  if (!('market' in jwt.payload) || jwt.payload.market?.id == null) {
    return null
  }

  const [order = null] = await client.request(
    core.readRelationships('customers', token.customerId, 'orders', {
      ...orderParams,
      filters: [
        {
          or: [{ market: 'id' }],
          matcher: { in: jwt.payload.market.id.join(',') }
        },
        { or: ['guest'], matcher: { false: 'true' } },
        // @ts-expect-error // TODO: double check this `editable` field
        { or: ['editable'], matcher: { true: 'true' } },
        { or: ['status'], matcher: { eq: 'pending' } }
      ],
      sort: {
        updated_at: 'desc'
      },
      pageSize: 1
    })
  )

  return order
}

export const getCart = memoize(pDebounce(_getCart, { wait: 10, maxWait: 50 }))

/**
 * Trigger the `cartUpdate` event.
 */
export const triggerCartUpdate: TriggerCartUpdate = async () => {
  const order = await getCart()

  if (order !== null) {
    fireEvent('cl-cart-update', [], order)
  }

  return order
}

/**
 * Trigger the `hostedCartUpdate` event.
 * @param iframeId iFrame ID who triggered the event
 */
export const triggerHostedCartUpdate: TriggerHostedCartUpdate = async (
  iframeId,
  order
) => {
  if (order !== null) {
    fireEvent('cl-cart-hostedcartupdate', [iframeId, order], order)
  }

  return order
}

export const addItem: AddItem = async (kind, code, quantity, options = {}) => {
  const client = await createClient(getConfig())
  const orderId = (await getCart())?.id ?? (await createEmptyCart()).id

  const lineItem = await client.request(
    core.createItem('line_items', {
      ...options,
      quantity,
      ...(kind === 'sku' ? { sku_code: code } : { bundle_code: code }),
      _update_quantity: true,
      relationships: {
        order: {
          id: orderId,
          type: 'orders'
        }
      }
    })
  )

  fireEvent('cl-cart-additem', [kind, code, quantity, options], lineItem)

  if (getCart.cache.clear !== undefined) {
    getCart.cache.clear()
  }

  await triggerCartUpdate()

  return lineItem
}

/**
 * Update the `cart_url` property of the cart on Commerce Layer.
 * `cart_url` is used in the Hosted Checkout as a link for "< Return to cart".
 * @param cartUrl new cart_url
 */
export async function updateCartUrl(cartUrl: string): Promise<void> {
  const cart = await getCart()

  if (cart !== null && cart.cart_url !== cartUrl) {
    const client = await createClient(getConfig())

    await client.request(
      core.updateItem('orders', cart.id, {
        cart_url: cartUrl
      })
    )
  }
}
