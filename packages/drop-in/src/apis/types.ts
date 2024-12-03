import type { Core } from '@commercelayer/js-sdk'
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

export interface Inventory {
  available: boolean
  quantity?: number
  levels: Level[]
}

// TODO: move this at sdk level
export type Sku = Omit<Core.Sku, 'inventory'> & {
  inventory?: Inventory
}

export type Bundle = Omit<Core.Bundle, 'skus' | 'sku_list'> & {
  skus?: Sku[] | null
  sku_list: Omit<Core.SkuList, 'sku_list_items'> & {
    sku_list_items: Array<Omit<Core.SkuListItem, 'sku'> & { sku: Sku }>
  }
}

export type GetSku = (code: string) => Promise<Sku | undefined>
export type GetSkuPrice = (code: string) => Promise<Core.Price | undefined>

export type GetBundle = (
  code: string
) => Promise<(Bundle & Pick<Sku, 'inventory'>) | undefined>
export type GetBundlePrice = (code: string) => Promise<Core.Price | undefined>

export type AddItem = (
  kind: 'bundle' | 'sku',
  code: string,
  quantity: number,
  options?: Partial<Pick<Core.LineItem, 'frequency'>>
) => Promise<Core.LineItem>

export type GetToken = () => Promise<Token>

export type TriggerHostedCartUpdate = (
  iframeId: string,
  order: Core.Order | null
) => Promise<Core.Order | null>

export type TriggerCartUpdate = () => Promise<Core.Order | null>

// Event types

export interface AvailabilityUpdateEventPayload {
  sku: Sku | undefined
  rule: 'cheapest' | 'fastest'
}
