import { getKeyForAccessToken } from '#apis/storage'
import { memoize } from '#utils/utils'
import { ClientCredentials, getSalesChannelToken } from '@commercelayer/js-auth'
import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'
import type { Config } from './config'

export const getAccessToken = memoize(async function (
  clientCredentials: ClientCredentials
): Promise<string> {
  const name = getKeyForAccessToken(clientCredentials)
  const value = Cookies.get(name)

  if (value !== undefined) {
    return value
  }

  const salesChannelToken = await getSalesChannelToken(clientCredentials).catch(
    (error) => {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Cannot get a sales channel token. ${error.body.error}. ${error.body.error_description}`
      )
    }
  )

  if (salesChannelToken == null) {
    throw new Error('Unable to get a valid sales channel token.')
  }

  const { accessToken, expires } = salesChannelToken
  Cookies.set(getKeyForAccessToken(clientCredentials), accessToken, {
    expires
  })

  return accessToken
})

export async function createClient(
  config: Config
): Promise<CommerceLayerClient> {
  const accessToken = await getAccessToken(config)

  return CommerceLayer({
    accessToken,
    organization: config.slug,
    domain: config.domain
  })
}
