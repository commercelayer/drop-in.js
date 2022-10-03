import { createClient, getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import type { Order } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

const cartKey = 'cl-drop-in--order-id'

async function createEmptyCart(): Promise<Order> {
  const client = await createClient(getConfig())
  const order = await client.orders.create({})
  Cookies.set(cartKey, order.id)
  return order
}

function getCartId(): string | null {
  return Cookies.get(cartKey) || null
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
export async function getCartUrl(forceCartToExist: boolean = false): Promise<string> {
  const config = getConfig()
  const accessToken = await getAccessToken(config)
  let cartId = getCartId()

  if (cartId === null && forceCartToExist === true) {
    const cart = await createEmptyCart()
    cartId = cart.id
  }

  return `https://${config.slug}.commercelayer.app/cart/${cartId}?accessToken=${accessToken}`
}

export async function getCart(): Promise<Order | null> {
  const client = await createClient(getConfig())

  const orderId = getCartId()

  if (!orderId) {
    return null
  }

  return await (client.orders.retrieve(orderId).catch(() => null))
}

export async function addItem(sku_code: string, quantity: number): Promise<void> {
  const client = await createClient(getConfig())
  const orderId = getCartId() || await (await createEmptyCart()).id

  await client.line_items.create({
    order: {
      id: orderId,
      type: 'orders'
    },
    quantity,
    sku_code,
    _update_quantity: true
  })

  // return await getCart()
}