import type { Resource } from "@commercelayer/sdk/single-client"
import type { Sku } from "@/apis/types"
import { pDebounce } from "@/utils/debounce"
import { logGroup } from "@/utils/logger"
import { chunk, uniq } from "@/utils/utils"
import { createClient } from "../client"
import { getConfig } from "../config"

/** Attribute names of a resource: every field except `id`, `type`, `meta` and relationships. */
type AttributeName<R extends Resource> = Exclude<
  {
    [K in keyof R]-?: NonNullable<R[K]> extends Resource | Resource[]
      ? never
      : K
  }[keyof R],
  "id" | "type" | "meta"
>

/**
 * Every SKU attribute, so the type check fails when the SDK adds one that is not listed here,
 * or when one listed here no longer exists.
 */
const skuAttributes = {
  code: true,
  name: true,
  description: true,
  image_url: true,
  pieces_per_pack: true,
  weight: true,
  unit_of_weight: true,
  hs_tariff_number: true,
  do_not_ship: true,
  do_not_track: true,
  inventory: true,
  jwt_custom_claim: true,
  created_at: true,
  updated_at: true,
  reference: true,
  reference_origin: true,
  metadata: true
} as const satisfies Record<AttributeName<Sku>, true>

/**
 * SKU attributes requested on the list, so each SKU matches what retrieving it returns.
 * Naming `inventory` in the fields is what makes the list return stock information.
 */
export const skuFields = Object.keys(skuAttributes) as Array<
  keyof typeof skuAttributes
>

const _getSkus = async (codes: string[]): Promise<SkuList> => {
  const client = await createClient(getConfig())

  const uniqCodes = uniq(codes)

  const log = logGroup("`getSkus` method invoked with a list of SKU codes")

  log(
    "info",
    '`getSkus` is the method involved in fetching a list of SKUs from Commerce Layer. You can follow the request in the "network" panel.',
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
            skus: skuFields,
          },
        })
      }),
    )
  ).flat()

  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const skus: SkuList = response.reduce<SkuList>((skus, sku) => {
    if (sku.code !== undefined) {
      skus[sku.code] = sku as Sku
    }

    return skus
  }, {})

  log.end()

  return skus
}

/**
 * Gets SKUs, including their inventory, by their codes using the `list` API.
 * Codes requested close together are fetched with a single request.
 */
export const getSkus = pDebounce(_getSkus, { wait: 10, maxWait: 50 })

interface SkuList {
  [code: string]: Sku | undefined
}
