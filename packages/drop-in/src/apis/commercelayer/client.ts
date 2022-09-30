import { getSalesChannelToken, ClientCredentials } from '@commercelayer/js-auth'
import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

function getCookieName(clientCredentials: ClientCredentials): string {
  return `clayer_token-${clientCredentials.clientId}-${clientCredentials.scope}`
}

export function getAccessToken(clientCredentials: ClientCredentials): string | null {
  const name = getCookieName(clientCredentials)
  return Cookies.get(name) || null
}

async function requestAccessToken(clientCredentials: ClientCredentials): Promise<string> {
  const value = getAccessToken(clientCredentials)

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
  const accessToken = await requestAccessToken(clientCredentials)

  const { hostname } = new URL(clientCredentials.endpoint)
  const [, organization, domain] = hostname.match(/^(.*).(commercelayer.(co|io))$/) || []

  if (!organization) {
    // TODO: define a proper error message
    throw new Error('Organization is missing')
  }

  return CommerceLayer({ accessToken, organization, domain })
}
