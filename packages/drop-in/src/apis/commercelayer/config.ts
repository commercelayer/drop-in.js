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
   * @example
   * `market:11708`
   */
  scope: string

  /**
   * Define the debug level.
   * @default none
   */
  debug?: 'none' | 'all'

  /**
   * Url used in the Hosted Cart to point to "Continue Shopping". This is also used in the thank you page.
   */
  returnUrl?: string
}

export type Config = CommerceLayerConfig & {
  debug: Exclude<CommerceLayerConfig['debug'], undefined>
  endpoint: string
}

// TODO: update all error messages with a proper link to documentation
export function getConfig(): Config {
  if (!('commercelayerConfig' in window)) {
    throw new Error(
      `"window.commercelayerConfig" is required.\nLink to doc here.`
    )
  }

  // @ts-expect-error
  const commercelayerConfig: CommerceLayerConfig = window.commercelayerConfig

  if (typeof commercelayerConfig.clientId !== 'string') {
    throw new Error(
      `"window.commercelayerConfig.clientId" is required.\nLink to doc here.`
    )
  }

  if (typeof commercelayerConfig.slug !== 'string') {
    throw new Error(
      `"window.commercelayerConfig.slug" is required.\nLink to doc here.`
    )
  }

  if (typeof commercelayerConfig.scope !== 'string') {
    throw new Error(
      `"window.commercelayerConfig.scope" is required.\nLink to doc here.`
    )
  }

  if (![undefined, 'none', 'all'].includes(commercelayerConfig.debug)) {
    throw new Error(
      `"window.commercelayerConfig.debug" should one of 'none' (default) or 'all'.\nLink to doc here.`
    )
  }

  if (
    commercelayerConfig.returnUrl !== undefined &&
    typeof commercelayerConfig.returnUrl !== 'string'
  ) {
    throw new Error(
      `"window.commercelayerConfig.returnUrl" is set but not a string.\nLink to doc here.`
    )
  }

  const debug: Config['debug'] = commercelayerConfig.debug ?? 'none'
  const endpoint: Config['endpoint'] = `https://${commercelayerConfig.slug}.commercelayer.io`

  return {
    ...commercelayerConfig,
    debug,
    endpoint
  }
}
