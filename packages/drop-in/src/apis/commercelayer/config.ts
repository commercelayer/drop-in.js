export type Config = {
  clientId: string
  endpoint: string
  scope: string
  debug?: 'none' | 'all'
}

export function getConfig(): Config {
  if (!('commercelayerConfig' in window)) {
    // TODO: define a proper error message
    throw new Error(`"window.commercelayerConfig" is required.\nLink to doc here.`)
  }

  // @ts-expect-error
  if (typeof (window.commercelayerConfig as Config).clientId !== 'string') {
    throw new Error(`"window.commercelayerConfig.clientId" is required.\nLink to doc here.`)
  }

  // @ts-expect-error
  if (typeof (window.commercelayerConfig as Config).endpoint !== 'string') {
    throw new Error(`"window.commercelayerConfig.endpoint" is required.\nLink to doc here.`)
  }

  // @ts-expect-error
  if (typeof (window.commercelayerConfig as Config).scope !== 'string') {
    throw new Error(`"window.commercelayerConfig.scope" is required.\nLink to doc here.`)
  }

  // @ts-expect-error
  if (![undefined, 'none', 'all'].includes((window.commercelayerConfig as Config).debug)) {
    throw new Error(`"window.commercelayerConfig.debug" should one of 'none' (default) or 'all'.\nLink to doc here.`)
  }

  // @ts-expect-error
  return window.commercelayerConfig
}
