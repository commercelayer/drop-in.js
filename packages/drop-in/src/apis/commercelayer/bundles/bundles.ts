import { fireEvent } from '#apis/event'
import type { Bundle, GetBundle } from '#apis/types'
import { memoize } from '../../../utils/utils'
import { createClient } from '../client'
import { getConfig } from '../config'
import { _getBundleViaList } from './list'

const getMemoizedBundle = memoize<GetBundle>(async (code) => {
  const bundle = await _getBundleViaList(code)

  if (bundle === undefined) {
    return undefined
  }

  const client = await createClient(getConfig())

  return (await client.bundles.retrieve(bundle.id, {
    include: [
      'skus', // this is useless because I don't have the SKU quantities.
      'sku_list',
      'sku_list.sku_list_items',
      'sku_list.sku_list_items.sku'
    ]
  })) as Bundle
})

export const getBundle: GetBundle = async (code) => {
  const bundle = await getMemoizedBundle(code)

  fireEvent('cl-bundles-getbundle', [code], bundle)

  return bundle
}
