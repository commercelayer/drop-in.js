import { getSalesChannelToken, ClientCredentials } from '@commercelayer/js-auth'
import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

function getCookieName(clientCredentials: ClientCredentials): string {
  return `clayer_token-${clientCredentials.clientId}-${clientCredentials.scope}`
}

export async function getAccessToken(clientCredentials: ClientCredentials): Promise<string> {
  const name = getCookieName(clientCredentials)
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
  Cookies.set(getCookieName(clientCredentials), accessToken, { expires })

  return accessToken
}

export async function createClient(clientCredentials: ClientCredentials): Promise<CommerceLayerClient> {
  const accessToken = await getAccessToken(clientCredentials)

  const { hostname } = new URL(clientCredentials.endpoint)
  const [, organization, domain] = hostname.match(/^(.*).(commercelayer.(co|io))$/) || []

  if (!organization) {
    // TODO: define a proper error message
    throw new Error('Organization is missing')
  }

  return CommerceLayer({ accessToken, organization, domain })
}
