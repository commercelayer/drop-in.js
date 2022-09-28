import { getSalesChannelToken, ClientCredentials } from '@commercelayer/js-auth'
import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

const getAccessToken = async (clientCredentials: ClientCredentials): Promise<string> => {
  const name = `clayer_token-${clientCredentials.clientId}-${clientCredentials.scope}`
  const value = Cookies.get(name)

  if (value) {
    return value
  }

  const salesChannelToken = await getSalesChannelToken(clientCredentials)

  if (!salesChannelToken) {
    // TODO: define a proper error message
    throw new Error('Cannot get a token')
  }

  const { accessToken, expires } = salesChannelToken
  Cookies.set(name, accessToken, { expires })

  return accessToken
}

export const createClient = async (clientCredentials: ClientCredentials): Promise<CommerceLayerClient> => {
  const accessToken = await getAccessToken(clientCredentials)

  const { hostname } = new URL(clientCredentials.endpoint)
  const [, organization, domain] = hostname.match(/^(.*).(commercelayer.(co|io))$/) || []

  if (!organization) {
    // TODO: define a proper error message
    throw new Error('Organization is missing')
  }

  return CommerceLayer({ accessToken, organization, domain })
}

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

