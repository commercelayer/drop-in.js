import { fireEvent } from "#apis/event"
import type { GetSku, Sku } from "#apis/types"
import { memoize } from "#utils/utils"
import { createClient } from "../client"
import { getConfig } from "../config"
import { _getSkuViaList } from "./list"

const getMemoizedSku = memoize<GetSku>(async (code) => {
  const { id } = (await _getSkuViaList(code)) ?? {}

  if (id === undefined) {
    return undefined
  }

  const client = await createClient(getConfig())

  const sku = (await client.skus.retrieve(id)) as Sku

  return sku
})

export const getSku: GetSku = async (code) => {
  const sku = await getMemoizedSku(code)

  fireEvent("cl-skus-getsku", [code], sku)

  return sku
}
