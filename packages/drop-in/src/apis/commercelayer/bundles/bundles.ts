import { fireEvent } from '#apis/event'
import type { Bundle, GetBundle, Inventory } from '#apis/types'
import { memoize } from '../../../utils/utils'
import { createClient } from '../client'
import { getConfig } from '../config'
import { _getBundleViaList } from './list'

export function getBundleInventory(bundle: Bundle): Inventory {
  return bundle.sku_list?.sku_list_items?.reduce<Inventory>(
    (inventory, skuListItem) => {
      const quantity =
        skuListItem.sku?.inventory?.quantity == null
          ? undefined
          : Math.floor(
              skuListItem.sku?.inventory?.quantity / (skuListItem.quantity ?? 1)
            )
      const available = skuListItem.sku.inventory?.available ?? false

      return {
        available: (inventory.available ?? true) && available,
        levels: inventory.levels,
        quantity:
          quantity != null && quantity < (inventory.quantity ?? Infinity)
            ? quantity
            : inventory.quantity
      }
    },
    {
      available: true,
      levels: []
    }
  )
}

const getMemoizedBundle = memoize<GetBundle>(async (code) => {
  const { id } = (await _getBundleViaList(code)) ?? {}

  if (id == null) {
    return undefined
  }

  const client = await createClient(getConfig())

  const bundle = (await client.bundles.retrieve(id, {
    include: [
      'sku_list',
      'sku_list.sku_list_items',
      'sku_list.sku_list_items.sku'
    ]
  })) as Bundle

  return {
    ...bundle,
    inventory: getBundleInventory(bundle)
  }
})

export const getBundle: GetBundle = async (code) => {
  const bundle = await getMemoizedBundle(code)

  fireEvent('cl-bundles-getbundle', [code], bundle)

  return bundle
}
