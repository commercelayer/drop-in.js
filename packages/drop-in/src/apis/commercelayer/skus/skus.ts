import { fireEvent } from "@/apis/event"
import type { GetSku } from "@/apis/types"
import { memoize } from "@/utils/utils"
import { getSkus } from "./list"

const getMemoizedSku = memoize<GetSku>(async (code) => {
  return await getSkus([code]).then((result) => result[code])
})

export const getSku: GetSku = async (code) => {
  const sku = await getMemoizedSku(code)

  fireEvent("cl-skus-getsku", [code], sku)

  return sku
}
