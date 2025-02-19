import type {
  Bundle as SdkBundle,
  LineItem,
  Order,
  Price,
  Sku as SdkSku,
  SkuList,
  SkuListItem
} from '@commercelayer/sdk'
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
export type Sku = Omit<SdkSku, 'inventory'> & {
  inventory?: Inventory
}

export type Bundle = Omit<SdkBundle, 'skus' | 'sku_list'> & {
  skus?: Sku[] | null
  sku_list: Omit<SkuList, 'sku_list_items'> & {
    sku_list_items: Array<Omit<SkuListItem, 'sku'> & { sku: Sku }>
  }
}

export type GetSku = (code: string) => Promise<Sku | undefined>
export type GetSkuPrice = (code: string) => Promise<Price | undefined>

export type GetBundle = (
  code: string
) => Promise<(Bundle & Pick<Sku, 'inventory'>) | undefined>
export type GetBundlePrice = (code: string) => Promise<Price | undefined>

export type AddItem = (
  kind: 'bundle' | 'sku',
  code: string,
  quantity: number,
  options?: Partial<Pick<LineItem, 'name' | 'image_url' | 'frequency'>>
) => Promise<LineItem>

export type GetToken = () => Promise<Token>

export type TriggerHostedCartUpdate = (
  iframeId: string,
  order: Order | null
) => Promise<Order | null>

export type TriggerCartUpdate = () => Promise<Order | null>

// Event types

export interface AvailabilityUpdateEventPayload {
  cartQuantity: number
  sku: Sku | undefined
  rule: 'cheapest' | 'fastest'
}
