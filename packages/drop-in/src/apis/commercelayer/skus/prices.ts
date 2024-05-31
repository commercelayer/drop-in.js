import { fireEvent } from '#apis/event'
import type { GetSkuPrice } from '#apis/types'
import { pDebounce } from '#utils/debounce'
import { logGroup } from '#utils/logger'
import type { Price } from '@commercelayer/sdk'
import { chunk, memoize, uniq } from '../../../utils/utils'
import { createClient } from '../client'
import { getConfig } from '../config'

interface PriceList {
  [sku: string]: Price | undefined
}

const _getPrices = async (skus: string[]): Promise<PriceList> => {
  const client = await createClient(getConfig())

  const uniqSkus = uniq(skus)

  const log = logGroup('`getSkuPrices` method invoked with a list of SKU codes')

  log(
    'info',
    '`getSkuPrices` is the method involved in fetching a list of prices from Commerce Layer. You can follow the request in the "network" panel.'
  )
  log('info', 'SKUs', uniqSkus)

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
      if (price.sku_code != null) {
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

const getMemoizedPrice = memoize<GetSkuPrice>(async (sku) => {
  return await getPrices([sku]).then((result) => result[sku])
})

export const getPrice: GetSkuPrice = async (sku) => {
  const price = await getMemoizedPrice(sku)

  /** @deprecated Use `cl-skus-getprice` instead. This will be removed in a future version. */
  fireEvent('cl-prices-getprice', [sku], price)

  fireEvent('cl-skus-getprice', [sku], price)

  return price
}
