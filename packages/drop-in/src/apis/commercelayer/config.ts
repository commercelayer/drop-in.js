interface CommerceLayerConfig {
  clientId: string
  slug: string
  scope: string
  debug?: 'none' | 'all'
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

  const debug: Config['debug'] = commercelayerConfig.debug ?? 'none'
  const endpoint: Config['endpoint'] = `https://${commercelayerConfig.slug}.commercelayer.io`

  return {
    ...commercelayerConfig,
    debug,
    endpoint
  }
}
