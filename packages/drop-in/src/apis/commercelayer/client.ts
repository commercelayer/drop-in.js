import { getKeyForAccessToken } from '#apis/storage'
import { memoize } from '#utils/utils'
import CommerceLayer, { CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'
import type { Config } from './config'

export interface ClientCredentials {
  clientId: string
  endpoint: string
  scope: string
}

interface SalesChannelToken {
  accessToken: string
  tokenType: string
  expires: Date
  expiresIn: number
  scope: string
  createdAt: string
}

async function getSalesChannelToken(
  clientCredentials: ClientCredentials
): Promise<SalesChannelToken | null> {
  const response = await fetch(`${clientCredentials.endpoint}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientCredentials.clientId,
      scope: clientCredentials.scope
    })
  })

  const token = await response.json()

  return token !== undefined
    ? {
        accessToken: token.access_token,
        createdAt: token.created_at,
        expires: new Date(Date.now() + parseInt(token.expires_in) * 1000),
        expiresIn: token.expires_in,
        scope: token.scope,
        tokenType: token.token_type
      }
    : null
}

export const getAccessToken = memoize(async function (
  clientCredentials: ClientCredentials
): Promise<string> {
  const name = getKeyForAccessToken(clientCredentials)
  const value = Cookies.get(name)

  if (value !== undefined && value !== 'undefined') {
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
