import { fireEvent } from '#apis/event'
import type { GetSku, Sku } from '#apis/types'
import { memoize } from '#utils/utils'
import { createClient } from '../client'
import { getConfig } from '../config'
import { _getSkuViaList } from './list'

const getMemoizedSku = memoize<GetSku>(async (code) => {
  const sku = await _getSkuViaList(code)

  if (sku === undefined) {
    return undefined
  }

  const client = await createClient(getConfig())

  return (await client.skus.retrieve(sku.id)) as Sku
})

export const getSku: GetSku = async (code) => {
  const sku = await getMemoizedSku(code)

  fireEvent('cl-skus-getsku', [code], sku)

  return sku
}
