import { fireEvent } from '#apis/event'
import type { GetSku, Sku } from '#apis/types'
import { pDebounce } from '#utils/debounce'
import { logGroup } from '#utils/logger'
import { chunk, memoize, uniq } from '#utils/utils'
import { createClient } from '../client'
import { getConfig } from '../config'

interface SkuIdList {
  [sku: string]: string | undefined
}

const _getSkuIds = async (skus: string[]): Promise<SkuIdList> => {
  const client = await createClient(getConfig())

  const uniqSkus = uniq(skus)

  const log = logGroup('`getSkuIds` method invoked with a list of SKUs')

  log(
    'info',
    '`getSkuIds` is the method involved in fetching a list of SKUs from Commerce Layer. You can follow the request in the "network" panel.'
  )
  log('info', 'SKUs', uniqSkus)

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

const getSkuIds = pDebounce(_getSkuIds, { wait: 10, maxWait: 50 })

const getSkuId = memoize(async (code: string): Promise<string | undefined> => {
  return await getSkuIds([code]).then((result) => result[code])
})

const getMemoizedSku = memoize<GetSku>(async (code) => {
  const id = await getSkuId(code)

  if (id === undefined) {
    return undefined
  }

  const client = await createClient(getConfig())

  return (await client.skus.retrieve(id)) as Sku
})

export const getSku: GetSku = async (code) => {
  const sku = await getMemoizedSku(code)

  fireEvent('cl-skus-getsku', [code], sku)

  return sku
}
