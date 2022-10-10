import { getKeyForAccessToken } from '#apis/storage'
import { memoize } from '#utils/utils'
import { getSalesChannelToken, ClientCredentials } from '@commercelayer/js-auth'
import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'

export const getAccessToken = memoize(async function (
  clientCredentials: ClientCredentials
): Promise<string> {
  const name = getKeyForAccessToken(clientCredentials)
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
  Cookies.set(getKeyForAccessToken(clientCredentials), accessToken, {
    expires
  })

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
