import { memoize } from '#utils/utils'
import { jwtDecode, jwtIsSalesChannel } from '@commercelayer/js-auth'
import {
  type DefaultConfig,
  getConfig as mergeConfig
} from '@commercelayer/organization-config'
import merge from 'lodash/merge'
import type { OmitDeep, SetRequired } from 'type-fest'
import { createClient, getAccessToken } from './client'

export interface CommerceLayerConfig {
  /**
   * Client ID is the application unique identifier. You can find it in your dashboard.
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
  debug?: 'none' | 'all'

  /**
   * Url used in the Hosted Cart to point to "Continue Shopping". This is also used in the thank you page.
   */
  orderReturnUrl?: string

  /**
   * The preferred language code (ISO 639-1) to be used when communicating with the customer.
   * This can be useful when sending the order to 3rd party marketing tools and CRMs.
   *
   * If the language is supported, the hosted checkout will be localized accordingly.
   * @default 'en'
   */
  languageCode?: string

  /**
   * API domain
   * _(only for development purpose)_.
   * @default 'commercelayer.io'
   */
  domain?: string
}

export type Config = CommerceLayerConfig & {
  debug: Exclude<CommerceLayerConfig['debug'], undefined>
  languageCode: Exclude<CommerceLayerConfig['languageCode'], undefined>
}

const documentationLink =
  'Read more here: https://commercelayer.github.io/drop-in.js/?path=/docs/getting-started--docs'

export function getConfig(): Config {
  if (!('commercelayerConfig' in window)) {
    throw new Error(
      `"window.commercelayerConfig" is required.\n${documentationLink}\n`
    )
  }

  const commercelayerConfig: CommerceLayerConfig = window.commercelayerConfig

  if (typeof commercelayerConfig.clientId !== 'string') {
    throw new Error(
      `"window.commercelayerConfig.clientId" is required.\n${documentationLink}\n`
    )
  }

  if (typeof commercelayerConfig.scope !== 'string') {
    throw new Error(
      `"window.commercelayerConfig.scope" is required.\n${documentationLink}\n`
    )
  }

  if (![undefined, 'none', 'all'].includes(commercelayerConfig.debug)) {
    throw new Error(
      `"window.commercelayerConfig.debug" should one of 'none' (default) or 'all'.\n${documentationLink}\n`
    )
  }

  if (
    commercelayerConfig.orderReturnUrl !== undefined &&
    typeof commercelayerConfig.orderReturnUrl !== 'string'
  ) {
    throw new Error(
      `"window.commercelayerConfig.orderReturnUrl" is set but not a string.\n${documentationLink}\n`
    )
  }

  if (
    typeof commercelayerConfig.domain !== 'string' ||
    commercelayerConfig.domain === ''
  ) {
    commercelayerConfig.domain = 'commercelayer.io'
  }

  const debug: Config['debug'] = commercelayerConfig.debug ?? 'none'
  const languageCode: Config['languageCode'] =
    commercelayerConfig.languageCode ?? 'en'

  return {
    ...commercelayerConfig,
    debug,
    languageCode
  }
}

const getOrganization = memoize(async () => {
  const config = getConfig()
  const client = await createClient(config)
  return await client.organization.retrieve({
    fields: {
      organizations: ['config']
    }
  })
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getOrganizationConfig(
  params?: Omit<ConfigParams, 'accessToken' | 'lang'>
) {
  const config = getConfig()
  const { accessToken } = await getAccessToken(config)
  const jwt = jwtDecode(accessToken)

  if (!('organization' in jwt.payload)) {
    throw new Error(
      'The access token does not contain the organization information.'
    )
  }

  const organization = await getOrganization()

  const slug = jwt.payload.organization.slug
  const domainPrefix = config.domain === 'commercelayer.co' ? '.stg' : ''
  const appEndpoint = `https://${slug}${domainPrefix}.commercelayer.app`

  const defaultConfig: ConfigJSONWithRequiredLinks = {
    mfe: {
      default: {
        links: {
          cart: `${appEndpoint}/cart/:order_id?accessToken=:access_token`,
          checkout: `${appEndpoint}/checkout/:order_id?accessToken=:access_token`,
          my_account: `${appEndpoint}/my-account?accessToken=:access_token`,
          identity: `${appEndpoint}/identity`
        }
      }
    }
  }

  const mergeConfigOptions: Parameters<typeof mergeConfig>[0] = {
    jsonConfig: merge<ConfigJSON, ConfigJSON, typeof organization.config>(
      {},
      defaultConfig,
      organization.config
    ),
    market:
      jwtIsSalesChannel(jwt.payload) && jwt.payload.market?.id[0] != null
        ? `market:id:${jwt.payload.market.id[0]}`
        : undefined,
    params: {
      ...params,
      accessToken,
      lang: config.languageCode
    }
  }

  return mergeConfig(mergeConfigOptions) as Omit<DefaultConfig, 'links'> & {
    links: RequiredLinks
  }
}

type ConfigLink = NonNullable<DefaultConfig['links']>
type ConfigParams = NonNullable<Parameters<typeof mergeConfig>[0]['params']>
type ConfigJSON = NonNullable<Parameters<typeof mergeConfig>[0]['jsonConfig']>
type RequiredLinks = SetRequired<
  ConfigLink,
  'cart' | 'checkout' | 'identity' | 'my_account'
>

type ConfigJSONWithRequiredLinks = OmitDeep<ConfigJSON, 'mfe.default.links'> & {
  mfe: {
    default: {
      links: RequiredLinks
    }
  }
}
