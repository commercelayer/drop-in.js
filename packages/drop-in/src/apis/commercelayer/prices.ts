import { dispatchEvent } from '#apis/event'
import type { GetPrice } from '#apis/types'
import { pDebounce } from '#utils/debounce'
import { logGroup } from '#utils/logger'
import type { Price } from '@commercelayer/sdk'
import { chunk, memoize, uniq } from '../../utils/utils'
import { createClient } from './client'
import { getConfig } from './config'

interface PriceList {
  [sku: string]: Price | undefined
}

const _getPrices = async (skus: string[]): Promise<PriceList> => {
  const client = await createClient(getConfig())

  const uniqSkus = uniq(skus)

  const log = logGroup('getPrices invoked')

  log('info', `found`, uniqSkus.length)
  log('info', 'unique skus', uniqSkus)

  const pageSize = 25
  const chunkedSkus = chunk(uniqSkus, pageSize)

  const pricesResponse = (
    await Promise.all(
      chunkedSkus.map(async (skus) => {
        return await client.prices.list({
          pageSize,
          filters: { sku_code_in: skus.join(',') }
        })
      })
    )
  ).flat()

  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const prices: PriceList = pricesResponse.reduce<PriceList>(
    (prices, price) => {
      if (price.sku_code !== undefined) {
        prices[price.sku_code] = price
      }

      return prices
    },
    {}
  )

  log.end()

  return prices
}

const getPrices = pDebounce(_getPrices, { wait: 10, maxWait: 50 })

const getMemoizedPrice = memoize<GetPrice>(async (sku) => {
  return await getPrices([sku]).then((result) => result[sku])
})

export const getPrice: GetPrice = async (sku) => {
  const price = await getMemoizedPrice(sku)

  dispatchEvent('cl.prices.getPrice', [sku], price)

  return price
}
