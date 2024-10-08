import { jwtDecode, jwtIsSalesChannel } from '@commercelayer/js-auth'
import { createClient, getAccessToken } from './client'
import { getConfig as mergeConfig } from '@commercelayer/organization-config'
import { getCart } from './cart'
import { memoize } from '#utils/utils'

export interface CommerceLayerConfig {
  /**
   * Client ID is the application unique identifier. You can find it in your dashboard.
   * @see https://docs.commercelayer.io/core/authentication/client-credentials
   */
  clientId: string

  /**
   * Slug for your organization. You can find it in your dashboard. Slug is the subdomain of your base endpoint.
   * @example
   * Given the base endpoint `https://drop-in-js.commercelayer.io`, the slug is `drop-in-js`.
   */
  slug: string

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
   * API domain
   * @default 'commercelayer.io'
   */
  domain?: string
}

export type Config = CommerceLayerConfig & {
  debug: Exclude<CommerceLayerConfig['debug'], undefined>
  endpoint: string
  appEndpoint: string
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

  if (typeof commercelayerConfig.slug !== 'string') {
    throw new Error(
      `"window.commercelayerConfig.slug" is required.\n${documentationLink}\n`
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
  const endpoint: Config['endpoint'] = `https://${commercelayerConfig.slug}.${commercelayerConfig.domain}`
  const appEndpoint = `https://${commercelayerConfig.slug}${
    commercelayerConfig.domain === 'commercelayer.co' ? '.stg' : ''
  }.commercelayer.app`

  return {
    ...commercelayerConfig,
    debug,
    endpoint,
    appEndpoint
  }
}

const getOrganization = memoize(async () => {
  const config = getConfig()
  const client = await createClient(config)
  return await client.organization.retrieve({
    fields: {
      // @ts-expect-error This is the resource name
      organizations: ['config']
    }
  })
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getOrganizationConfig() {
  const config = getConfig()
  const { accessToken } = await getAccessToken(config)
  const jwt = jwtDecode(accessToken)
  const cart = await getCart()

  const organization = await getOrganization()

  const mergeConfigOptions: Parameters<typeof mergeConfig>[0] = {
    jsonConfig: organization.config ?? {},
    market:
      jwtIsSalesChannel(jwt.payload) && jwt.payload.market?.id[0] != null
        ? `market:id:${jwt.payload.market.id[0]}`
        : undefined,
    params: {
      accessToken,
      orderId: cart?.id,
      lang: 'en'
    }
  }

  return mergeConfig(mergeConfigOptions)
}
