import { jwtDecode, jwtIsSalesChannel } from "@commercelayer/js-auth"
import {
  type DefaultMfeConfig,
  getMfeConfig as mergeConfig,
} from "@commercelayer/organization-config"
import type { OrderCreate, ResourceRel } from "@commercelayer/sdk"
import { merge } from "lodash-es"
import type { ConditionalExcept, OmitDeep, SetRequired } from "type-fest"
import { memoize } from "#utils/utils"
import { createClient, getAccessToken } from "./client"

export interface CommerceLayerConfig {
  /**
   * The version of the library.
   * This is automatically set by the build process and should not be manually specified.
   */
  version: "drop-in.js@2.17.0"

  /**
   * The client ID (from you API credentials).
   * @see https://docs.commercelayer.io/core/authentication/client-credentials
   */
  clientId: string

  /**
   * Restrict the dataset of your application by specifying allowed scopes. You can find them in your dashboard.
   * @example 'market:code:usa'
   */
  scope: string

  /**
   * Define the debug level.
   * @default 'none'
   */
  debug?: "none" | "all"

  /**
   * The URL the cart's *Continue shopping* button points to. This is also used in the thank you page.
   * @deprecated Use `defaultAttributes.orders.return_url` instead.
   */
  orderReturnUrl?: string

  /**
   * The preferred language code (ISO 639-1) to be used when communicating with the customer.
   * If the language is supported, the hosted checkout will be localized accordingly.
   * @default 'en'
   * @deprecated Use `defaultAttributes.orders.language_code` instead.
   */
  languageCode?: string

  /**
   * The suffix appended to the storage key for the order.
   * This is especially useful for differentiating carts when the `clientId` and `scope` are the same.
   *
   * By default, the storage key is `commercelayer_order-id-<clientId>-<scope>`.
   * When set, the storage key follows this format: `commercelayer_order-id-<clientId>-<scope>-<suffix>`.
   *
   * @example 'my-suffix'
   */
  storageOrderKeySuffix?: string

  /**
   * Default attributes when creating a resource.
   */
  defaultAttributes?: {
    /**
     * Default attributes when creating an `orders` resource type.
     * @see https://docs.commercelayer.io/core/api-reference/orders/object
     */
    orders?: ConditionalExcept<
      OrderCreate,
      ResourceRel | ResourceRel[] | null | undefined
    >
  }

  /**
   * API domain
   * _(only for development purpose)_.
   * @default 'commercelayer.io'
   */
  domain?: string
}

export type Config = CommerceLayerConfig & {
  debug: Exclude<CommerceLayerConfig["debug"], undefined>
}

const documentationLink =
  "Read more here: https://commercelayer.github.io/drop-in.js/?path=/docs/getting-started--docs"

const defaultLanguageCode = "en"

export function getConfig(): Config {
  if (!("commercelayerConfig" in window)) {
    throw new Error(
      `"window.commercelayerConfig" is required.\n${documentationLink}\n`,
    )
  }

  // NOTE: This is automatically set by the build process and should not be manually specified.
  window.commercelayerConfig.version = "drop-in.js@2.17.0"

  const commercelayerConfig: CommerceLayerConfig = window.commercelayerConfig

  if (typeof commercelayerConfig.clientId !== "string") {
    throw new Error(
      `"window.commercelayerConfig.clientId" is required.\n${documentationLink}\n`,
    )
  }

  if (typeof commercelayerConfig.scope !== "string") {
    throw new Error(
      `"window.commercelayerConfig.scope" is required.\n${documentationLink}\n`,
    )
  }

  if (![undefined, "none", "all"].includes(commercelayerConfig.debug)) {
    throw new Error(
      `"window.commercelayerConfig.debug" should one of 'none' (default) or 'all'.\n${documentationLink}\n`,
    )
  }

  if (
    typeof commercelayerConfig.domain !== "string" ||
    commercelayerConfig.domain === ""
  ) {
    commercelayerConfig.domain = "commercelayer.io"
  }

  const debug: Config["debug"] = commercelayerConfig.debug ?? "none"

  // START-BLOCK // TODO: Remove deprecated properties in the next major version.
  commercelayerConfig.defaultAttributes ??= {}
  commercelayerConfig.defaultAttributes.orders ??= {}
  commercelayerConfig.defaultAttributes.orders.language_code ??=
    commercelayerConfig.languageCode ?? defaultLanguageCode
  commercelayerConfig.defaultAttributes.orders.return_url ??=
    commercelayerConfig.orderReturnUrl
  // END-BLOCK

  return {
    ...commercelayerConfig,
    debug,
  }
}

const getOrganization = memoize(async () => {
  const config = getConfig()
  const client = await createClient(config)
  return await client.organization.retrieve({
    fields: {
      organizations: ["config"],
    },
  })
})

export async function getOrganizationConfig(
  params?: Omit<ConfigParams, "accessToken" | "lang">,
) {
  const config = getConfig()
  const { accessToken } = await getAccessToken(config)
  const jwt = jwtDecode(accessToken)

  if (!("organization" in jwt.payload)) {
    throw new Error(
      "The access token does not contain the organization information.",
    )
  }

  const organization = await getOrganization()

  const domainPrefix = config.domain === "commercelayer.co" ? ".stg" : ""
  const appEndpoint = `https://:slug${domainPrefix}.commercelayer.app`

  const defaultConfig: ConfigJSONWithRequiredLinks = {
    mfe: {
      default: {
        links: {
          cart: `${appEndpoint}/cart/:order_id?accessToken=:access_token`,
          checkout: `${appEndpoint}/checkout/:order_id?accessToken=:access_token`,
          my_account: `${appEndpoint}/my-account?accessToken=:access_token`,
          identity: `${appEndpoint}/identity`,
        },
      },
    },
  }

  const mergeConfigOptions: Parameters<typeof mergeConfig>[0] = {
    jsonConfig: merge<ConfigJSON, ConfigJSON, typeof organization.config>(
      {},
      defaultConfig,
      organization.config,
    ),
    market:
      jwtIsSalesChannel(jwt.payload) && jwt.payload.market?.id[0] != null
        ? `market:id:${jwt.payload.market.id[0]}`
        : undefined,
    params: {
      ...params,
      accessToken,
      slug: jwt.payload.organization.slug,
      lang:
        config.defaultAttributes?.orders?.language_code ?? defaultLanguageCode,
    },
  }

  return mergeConfig(mergeConfigOptions) as Omit<DefaultMfeConfig, "links"> & {
    links: RequiredLinks
  }
}

type ConfigLink = NonNullable<DefaultMfeConfig["links"]>
type ConfigParams = NonNullable<Parameters<typeof mergeConfig>[0]["params"]>
type ConfigJSON = NonNullable<Parameters<typeof mergeConfig>[0]["jsonConfig"]>
type RequiredLinks = SetRequired<
  ConfigLink,
  "cart" | "checkout" | "identity" | "my_account"
>

type ConfigJSONWithRequiredLinks = OmitDeep<ConfigJSON, "mfe.default.links"> & {
  mfe: {
    default: {
      links: RequiredLinks
    }
  }
}
