import { fireEvent } from '#apis/event'
import type { GetBundle, GetBundlePrice } from '#apis/types'
import { pDebounce } from '#utils/debounce'
import { logGroup } from '#utils/logger'
import type { Bundle, Price } from '@commercelayer/sdk'
import { chunk, memoize, uniq } from '../../utils/utils'
import { createClient } from './client'
import { getConfig } from './config'

interface BundleList {
  [sku: string]: Bundle | undefined
}

const _getBundles = async (codes: string[]): Promise<BundleList> => {
  const client = await createClient(getConfig())

  const uniqCodes = uniq(codes)

  const log = logGroup('`getBundles` method invoked with a list of SKUs')

  log(
    'info',
    '`getBundles` is the method involved in fetching a list of bundles from Commerce Layer. You can follow the request in the "network" panel.'
  )
  log('info', 'codes', uniqCodes)

  const pageSize = 25
  const chunkedCodes = chunk(uniqCodes, pageSize)

  const bundlesResponse = (
    await Promise.all(
      chunkedCodes.map(async (codes) => {
        return await client.bundles.list({
          pageSize,
          filters: { code_in: codes.join(',') }
        })
      })
    )
  ).flat()

  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const bundles: BundleList = bundlesResponse.reduce<BundleList>(
    (bundles, bundle) => {
      if (bundle.code !== undefined) {
        bundles[bundle.code] = bundle
      }

      return bundles
    },
    {}
  )

  log.end()

  return bundles
}

const getBundles = pDebounce(_getBundles, { wait: 10, maxWait: 50 })

const getMemoizedBundle = memoize<GetBundle>(async (code) => {
  return await getBundles([code]).then((result) => result[code])
})

const getBundle: GetBundle = async (code) => {
  const bundle = await getMemoizedBundle(code)

  fireEvent('cl-bundles-getbundle', [code], bundle)

  return bundle
}

const getMemoizedPrice = memoize<GetBundlePrice>(async (code) => {
  return await getBundle(code).then((bundle) => {
    if (bundle?.price_amount_cents == null) {
      return undefined
    }

    const price: Price = {
      amount_cents: bundle.price_amount_cents,
      amount_float: bundle?.price_amount_float,
      compare_at_amount_cents: bundle?.compare_at_amount_cents,
      compare_at_amount_float: bundle?.compare_at_amount_float,
      created_at: bundle?.created_at,
      formatted_amount: bundle?.formatted_price_amount,
      formatted_compare_at_amount: bundle?.formatted_compare_at_amount,
      id: bundle?.id,
      type: 'prices',
      updated_at: bundle?.updated_at,
      currency_code: bundle?.currency_code
    }

    return price
  })
})

export const getPrice: GetBundlePrice = async (code) => {
  const price = await getMemoizedPrice(code)

  fireEvent('cl-bundles-getprice', [code], price)

  return price
}
