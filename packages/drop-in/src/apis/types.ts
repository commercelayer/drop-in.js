import type { LineItem, Order, Price, Sku as SdkSku } from '@commercelayer/sdk'
import { type Token } from './commercelayer/client'

interface DeliveryLeadTime {
  shipping_method: {
    name: string
    reference: string
    price_amount_cents: number
    free_over_amount_cents: number | null
    formatted_price_amount: string
    formatted_free_over_amount: string | null
  }
  min: {
    hours: number
    days: number
  }
  max: {
    hours: number
    days: number
  }
}

interface Level {
  quantity: number
  delivery_lead_times: DeliveryLeadTime[]
}

interface Inventory {
  available: boolean
  quantity?: number
  levels: Level[]
}

// TODO: move this at sdk level
export type Sku = SdkSku & {
  inventory?: Inventory
}

export type GetPrice = (sku: string) => Promise<Price | undefined>

export type GetSku = (code: string) => Promise<Sku | undefined>

export type AddItem = (sku: string, quantity: number) => Promise<LineItem>

export type GetToken = () => Promise<Token>

export type TriggerHostedCartUpdate = (
  iframeId: string,
  order: Order | null
) => Promise<Order | null>

export type TriggerCartUpdate = () => Promise<Order | null>

// Event types

export interface AvailabilityUpdateEventPayload {
  sku: Sku | undefined
  rule: 'cheapest' | 'fastest'
}
