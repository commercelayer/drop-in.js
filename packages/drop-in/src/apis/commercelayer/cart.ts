import { createClient, getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import { getKeyForCart } from '#apis/storage'
import { pDebounce } from '#utils/promise'
import type { Order } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

/**
 * Create a draft order.
 * @see https://docs.commercelayer.io/core/v/how-tos/shopping-cart/create-a-shopping-cart
 * @returns Returns the created draft order.
 */
async function createEmptyCart(): Promise<Order> {
  const config = getConfig()
  const client = await createClient(config)
  const order = await client.orders.create({
    return_url: config.returnUrl
  })

  setCartId(order.id)

  await triggerCartUpdate()

  return order
}

const LINE_ITEMS_SHIPPABLE = ['skus', 'bundles'] as const
const LINE_ITEMS_SHOPPABLE = [...LINE_ITEMS_SHIPPABLE, 'gift_cards'] as const

export function isValidForCheckout(order: Order): boolean {
  return (
    order.line_items?.find((lineItem) => {
      return LINE_ITEMS_SHOPPABLE.includes(
        lineItem.item_type as typeof LINE_ITEMS_SHOPPABLE[number]
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

export function isValidUrl(url: string): boolean {
  const cartId = getCartId()

  return cartId !== null && url.includes(`/${cartId}?`)
}

/**
 * Get the Hosted Cart url.
 * @param forceCartToExist When true it will create an empty cart if not existing before.
 * @returns Returns the Hosted Cart url.
 */
export async function getCartUrl(
  forceCartToExist: boolean = false
): Promise<string> {
  const config = getConfig()
  const accessToken = await getAccessToken(config)
  let cartId = (await getCart())?.id

  if (cartId === null && forceCartToExist) {
    const cart = await createEmptyCart()
    cartId = cart.id
  }

  return `https://${config.slug}.commercelayer.app/cart/${
    cartId ?? 'null'
  }?accessToken=${accessToken}`
}

export async function getCheckoutUrl(): Promise<string | undefined> {
  const config = getConfig()
  const accessToken = await getAccessToken(config)
  const cart = await getCart()

  if (cart === null || !isValidForCheckout(cart)) {
    return undefined
  }

  return `https://${config.slug}.checkout.commercelayer.app/${
    cart.id ?? 'null'
  }?accessToken=${accessToken}`
}

export async function _getCart(): Promise<Order | null> {
  const client = await createClient(getConfig())

  const orderId = getCartId()

  if (orderId === null) {
    return null
  }

  const order = await client.orders
    .retrieve(orderId, {
      include: ['line_items.item', 'line_items.line_item_options.sku_option']
    })
    .catch(() => null)

  if (order?.editable === false) {
    removeCartId()
    return null
  }

  return order
}

export const getCart = pDebounce(_getCart, { wait: 50, maxWait: 100 })

export async function triggerCartUpdate(): Promise<void> {
  const order = await getCart()

  if (order !== null) {
    // TODO: manage events in separate file
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { order } }))
  }
}

export async function triggerHostedCartUpdate(fromId: string): Promise<void> {
  const order = await getCart()

  if (order !== null) {
    // TODO: manage events in separate file
    window.dispatchEvent(
      new CustomEvent('hostedCartUpdate', { detail: { fromId, order } })
    )
  }
}

export async function addItem(sku: string, quantity: number): Promise<void> {
  const client = await createClient(getConfig())
  const orderId = (await getCart())?.id ?? (await (await createEmptyCart()).id)

  await client.line_items.create({
    order: {
      id: orderId,
      type: 'orders'
    },
    quantity,
    sku_code: sku,
    _update_quantity: true
  })

  await triggerCartUpdate()
}

/**
 * Update the `cart_url` property of the cart.
 * `cart_url` is used in the Hosted Checkout as a link for "< Return to cart".
 * @param cartUrl new cart_url
 */
export async function updateCartUrl(cartUrl: string): Promise<void> {
  const cart = await getCart()

  if (cart !== null) {
    const client = await createClient(getConfig())
    await client.orders.update({
      id: cart.id,
      cart_url: cartUrl
    })
  }
}
