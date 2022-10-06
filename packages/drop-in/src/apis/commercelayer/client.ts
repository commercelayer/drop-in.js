import { memoize } from '#utils/utils'
import { getSalesChannelToken, ClientCredentials } from '@commercelayer/js-auth'
import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

function getCookieName(clientCredentials: ClientCredentials): string {
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : clientCredentials.scope ?? 'undefined'

  return `clayer_token-${clientCredentials.clientId}-${scope}`
}

export const getAccessToken = memoize(async function (
  clientCredentials: ClientCredentials
): Promise<string> {
  const name = getCookieName(clientCredentials)
  const value = Cookies.get(name)

  if (value !== undefined) {
    return value
  }

  const salesChannelToken = await getSalesChannelToken(clientCredentials)

  if (salesChannelToken == null) {
    // TODO: define a proper error message
    throw new Error('Cannot get a token')
  }

  const { accessToken, expires } = salesChannelToken
  Cookies.set(getCookieName(clientCredentials), accessToken, { expires })

  return accessToken
})

export async function createClient(
  clientCredentials: ClientCredentials
): Promise<CommerceLayerClient> {
  const accessToken = await getAccessToken(clientCredentials)

  const { hostname } = new URL(clientCredentials.endpoint)
  const [, organization, domain] =
    hostname.match(/^(.*).(commercelayer.(co|io))$/) ?? []

  if (organization === undefined) {
    // TODO: define a proper error message
    throw new Error('Organization is missing')
  }

  return CommerceLayer({ accessToken, organization, domain })
}
