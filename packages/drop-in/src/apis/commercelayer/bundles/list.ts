import type { Bundle } from "#apis/types"
import { pDebounce } from "#utils/debounce"
import { logGroup } from "#utils/logger"
import { chunk, memoize, uniq } from "../../../utils/utils"
import { createClient } from "../client"
import { getConfig } from "../config"

const _getBundlesViaList = async (codes: string[]): Promise<BundleViaList> => {
  const client = await createClient(getConfig())

  const uniqCodes = uniq(codes)

  const log = logGroup(
    "`getBundlesViaList` method invoked with a list of Bundle codes",
  )

  log(
    "info",
    '`getBundlesViaList` is the method involved in fetching a list of Bundles from Commerce Layer. You can follow the request in the "network" panel.',
  )
  log("info", "codes", uniqCodes)

  const pageSize = 25
  const chunkedCodes = chunk(uniqCodes, pageSize)

  const response = (
    await Promise.all(
      chunkedCodes.map(async (codes) => {
        return await client.bundles.list({
          pageSize,
          filters: { code_in: codes.join(",") },
          fields: {
            bundles: [
              "id",
              "code",
              "compare_at_amount_cents",
              "compare_at_amount_float",
              "created_at",
              "currency_code",
              "formatted_compare_at_amount",
              "formatted_price_amount",
              "price_amount_cents",
              "price_amount_float",
              "updated_at",
            ],
          },
        })
      }),
    )
  ).flat()

  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const bundles: BundleViaList = response.reduce<BundleViaList>(
    (bundles, bundle) => {
      if (bundle.code !== undefined) {
        bundles[bundle.code] = bundle
      }

      return bundles
    },
    {},
  )

  log.end()

  return bundles
}

const getBundlesViaList = pDebounce(_getBundlesViaList, {
  wait: 10,
  maxWait: 50,
})

/**
 * Get a Bundle by providing a bundle code using the `list` API.
 * List API **does not provide** _stock information_.
 * @protected
 */
export const _getBundleViaList = memoize(
  async (code: string): Promise<BundleViaList[string]> => {
    return await getBundlesViaList([code]).then((result) => result[code])
  },
)

interface BundleViaList {
  [code: string]:
    | Pick<
        Bundle,
        | "id"
        | "code"
        | "compare_at_amount_cents"
        | "compare_at_amount_float"
        | "created_at"
        | "currency_code"
        | "formatted_compare_at_amount"
        | "formatted_price_amount"
        | "price_amount_cents"
        | "price_amount_float"
        | "updated_at"
      >
    | undefined
}
