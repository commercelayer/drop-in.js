import { createClient } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import type { Order } from '@commercelayer/sdk'

const cartKey = 'cl-drop-in--order-id'

async function createEmptyCart(): Promise<Order> {
  const client = await createClient(getConfig())
  const order = await client.orders.create({})
  window.localStorage.setItem(cartKey, order.id)
  return order
}

export async function getCart(): Promise<Order | null> {
  const client = await createClient(getConfig())

  const orderId = window.localStorage.getItem(cartKey)

  if (!orderId) {
    return null
  }

  return await (client.orders.retrieve(orderId).catch(() => null))
}

export async function addItem(sku_code: string, quantity: number) {
  const client = await createClient(getConfig())
  const order = await getCart() || await createEmptyCart()

  await client.line_items.create({
    order: {
      id: order.id,
      type: 'orders'
    },
    quantity,
    sku_code,
    _update_quantity: true
  })

  return await getCart()
}