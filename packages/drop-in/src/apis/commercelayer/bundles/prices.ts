import type { Price } from "@commercelayer/sdk"
import { fireEvent } from "@/apis/event"
import type { GetBundlePrice } from "@/apis/types"
import { memoize } from "../../../utils/utils"
import { _getBundleViaList } from "./list"

const getMemoizedPrice = memoize<GetBundlePrice>(async (code) => {
  return await _getBundleViaList(code).then((bundle) => {
    if (bundle?.price_amount_cents == null) {
      return undefined
    }

    const price: Price = {
      amount_cents: bundle.price_amount_cents,
      amount_float: bundle.price_amount_float,
      compare_at_amount_cents: bundle.compare_at_amount_cents,
      compare_at_amount_float: bundle.compare_at_amount_float,
      created_at: bundle.created_at,
      formatted_amount: bundle.formatted_price_amount,
      formatted_compare_at_amount: bundle.formatted_compare_at_amount,
      id: bundle.id,
      type: "prices",
      updated_at: bundle.updated_at,
      currency_code: bundle.currency_code,
    }

    return price
  })
})

export const getPrice: GetBundlePrice = async (code) => {
  const price = await getMemoizedPrice(code)

  fireEvent("cl-bundles-getprice", [code], price)

  return price
}
