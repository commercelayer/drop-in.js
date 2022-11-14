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

  await triggerCartUpdate(order)

  return order
}

function removeCartId(): void {
  Cookies.remove(getKeyForCart())
}

function setCartId(cartId: string): void {
  Cookies.set(getKeyForCart(), cartId)
}

function getCartId(): string | null {
  return Cookies.get(getKeyForCart()) ?? null
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

export async function _getCart(): Promise<Order | null> {
  const client = await createClient(getConfig())

  const orderId = getCartId()

  if (orderId === null) {
    return null
  }

  const order = await client.orders.retrieve(orderId).catch(() => null)

  if (order?.editable === false) {
    removeCartId()
    return null
  }

  return order
}

export const getCart = pDebounce(_getCart, { wait: 50, maxWait: 100 })

export async function triggerCartUpdate(order: Order | null): Promise<void> {
  order ||= await getCart()

  if (order !== null) {
    // TODO: manage events in separate file
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: order }))
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

  await triggerCartUpdate(null)
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
