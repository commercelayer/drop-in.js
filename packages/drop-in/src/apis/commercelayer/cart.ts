import { createClient, getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import { getKeyForCart } from '#apis/storage'
import type { Order } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

/**
 * Create a draft order.
 * @see https://docs.commercelayer.io/core/v/how-tos/shopping-cart/create-a-shopping-cart
 * @returns Returns the created draft order.
 */
async function createEmptyCart(): Promise<Order> {
  const client = await createClient(getConfig())
  const order = await client.orders.create({})
  setCartId(order.id)

  await triggerCartUpdate(order)

  return order
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
  let cartId = getCartId()

  if (cartId === null && forceCartToExist) {
    const cart = await createEmptyCart()
    cartId = cart.id
  }

  return `https://${config.slug}.commercelayer.app/cart/${
    cartId ?? 'null'
  }?accessToken=${accessToken}`
}

export async function getCart(): Promise<Order | null> {
  const client = await createClient(getConfig())

  const orderId = getCartId()

  if (orderId === null) {
    return null
  }

  const order = await client.orders.retrieve(orderId).catch(() => null)

  await triggerCartUpdate(order)

  return order
}

export async function triggerCartUpdate(order: Order | null): Promise<void> {
  // TODO: manage events in separate file

  if (order === null) {
    const order = await getCart()
    if (order !== null) {
      window.dispatchEvent(new CustomEvent('cartUpdate', { detail: order }))
    }
  } else {
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: order }))
  }
}

export async function addItem(sku: string, quantity: number): Promise<void> {
  const client = await createClient(getConfig())
  const orderId = getCartId() ?? (await (await createEmptyCart()).id)

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
