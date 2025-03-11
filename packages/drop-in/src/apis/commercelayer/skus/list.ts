import type { Sku } from "#apis/types"
import { pDebounce } from "#utils/debounce"
import { logGroup } from "#utils/logger"
import { chunk, memoize, uniq } from "#utils/utils"
import { createClient } from "../client"
import { getConfig } from "../config"

const _getSkusViaList = async (codes: string[]): Promise<SkuViaList> => {
  const client = await createClient(getConfig())

  const uniqCodes = uniq(codes)

  const log = logGroup(
    "`getSkusViaList` method invoked with a list of SKU codes",
  )

  log(
    "info",
    '`getSkusViaList` is the method involved in fetching a list of SKUs from Commerce Layer. You can follow the request in the "network" panel.',
  )
  log("info", "codes", uniqCodes)

  const pageSize = 25
  const chunkedCodes = chunk(uniqCodes, pageSize)

  const response = (
    await Promise.all(
      chunkedCodes.map(async (codes) => {
        return await client.skus.list({
          pageSize,
          filters: { code_in: codes.join(",") },
          fields: {
            skus: ["id", "code"],
          },
        })
      }),
    )
  ).flat()

  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const skus: SkuViaList = response.reduce<SkuViaList>((skus, sku) => {
    if (sku.id !== undefined && sku.code !== undefined) {
      skus[sku.code] = sku
    }

    return skus
  }, {})

  log.end()

  return skus
}

const getSkusViaList = pDebounce(_getSkusViaList, { wait: 10, maxWait: 50 })

/**
 * Get a SKU by providing a SKU code using the `list` API.
 * List API **does not provide** _stock information_.
 * @protected
 */
export const _getSkuViaList = memoize(
  async (code: string): Promise<SkuViaList[string]> => {
    return await getSkusViaList([code]).then((result) => result[code])
  },
)

interface SkuViaList {
  [code: string]: Pick<Sku, "id" | "code"> | undefined
}
