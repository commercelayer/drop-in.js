import { logGroup } from '#utils/logger'
import { pDebounce } from '#utils/promise'
import { chunk, memoize, uniq } from '#utils/utils'
import type { Sku as SdkSku } from '@commercelayer/sdk'
import { createClient } from './client'
import { getConfig } from './config'

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
  quantity: number
  levels: Level[]
}

export type Sku = SdkSku & {
  inventory?: Inventory
}

interface SkuIdList {
  [sku: string]: string | undefined
}

const _getSkuIds = async (skus: string[]): Promise<SkuIdList> => {
  const client = await createClient(getConfig())

  const uniqSkus = uniq(skus)

  const log = logGroup('getSkuIds invoked')

  log('info', `found`, uniqSkus.length)
  log('info', 'unique skus', uniqSkus)

  const pageSize = 25
  const chunkedSkus = chunk(uniqSkus, pageSize)

  const idsResponse = (
    await Promise.all(
      chunkedSkus.map(async (skus) => {
        return await client.skus.list({
          pageSize,
          filters: { code_in: skus.join(',') },
          fields: ['id', 'code']
        })
      })
    )
  ).flat()

  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const ids: SkuIdList = idsResponse.reduce<SkuIdList>((ids, sku) => {
    if (sku.id !== undefined && sku.code !== undefined) {
      ids[sku.code] = sku.id
    }

    return ids
  }, {})

  log.end()

  return ids
}

const getSkuIds = pDebounce(_getSkuIds, { wait: 50, maxWait: 100 })

export const getSkuId = memoize(
  async (sku: string): Promise<string | undefined> => {
    return await getSkuIds([sku]).then((result) => result[sku])
  }
)

export const getSku = memoize(async (sku: string): Promise<Sku | undefined> => {
  const id = await getSkuId(sku)

  if (id === undefined) {
    return undefined
  }

  const client = await createClient(getConfig())

  return (await client.skus.retrieve(id)) as Sku
})
