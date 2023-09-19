import { fireEvent } from '#apis/event'
import { getKeyForCustomerToken, getKeyForGuestToken } from '#apis/storage'
import CommerceLayer, { type CommerceLayerClient } from '@commercelayer/sdk'
import Cookies from 'js-cookie'
import memoize from 'lodash/memoize'
import { getConfig, type Config } from './config'

export type Token = (
  | {
      type: 'guest'
    }
  | {
      type: 'customer'
      customerId: string
    }
) & {
  accessToken: string
  scope: string
}

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

function setToken(key: string, value: Token, expires?: Date): void {
  Cookies.set(key, JSON.stringify(value), { expires })
}

function clearToken(key: string): void {
  Cookies.remove(key)
}

function getToken(key: string): Token | undefined {
  const cookie = Cookies.get(key)

  if (cookie == null) {
    return undefined
  }

  try {
    return JSON.parse(cookie)
  } catch (e) {
    return undefined
  }
}

interface ResponseToken {
  owner?: {
    id: string
    type: 'Customer'
  }
  exp: number
}

function parseToken(token: string): { header: any; payload: ResponseToken } {
  const [header, payload] = token.split('.')
  return {
    header: JSON.parse(header != null ? window.atob(header) : 'null'),
    payload: JSON.parse(payload != null ? window.atob(payload) : 'null')
  }
}

async function revokeToken(
  clientCredentials: ClientCredentials,
  accessToken: string
): Promise<boolean> {
  return await fetch(`${clientCredentials.endpoint}/oauth/revoke`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: clientCredentials.clientId,
      token: accessToken
    })
  })
    .then(async (res) => await res.json())
    .then(() => true)
    .catch(() => false)
}

async function getSalesChannelToken(
  clientCredentials: ClientCredentials
): Promise<SalesChannelToken | null> {
  const token = await fetch(`${clientCredentials.endpoint}/oauth/token`, {
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
    .then(async (res) => await res.json())
    .catch(() => undefined)

  if (token === undefined) {
    return null
  }

  return {
    accessToken: token.access_token,
    createdAt: token.created_at,
    expires: new Date(Date.now() + parseInt(token.expires_in) * 1000),
    expiresIn: token.expires_in,
    scope: token.scope,
    tokenType: token.token_type
  }
}

const getCustomerInfoFromUrl = (): {
  accessToken: string | undefined
  scope: string | undefined
} => {
  const url = new URL(window.location.href)
  const { searchParams } = url
  const accessToken = searchParams.get('accessToken') ?? undefined
  const scope = searchParams.get('scope') ?? undefined

  searchParams.delete('accessToken')
  searchParams.delete('scope')
  window.history.replaceState({}, '', url.toString())

  return {
    accessToken,
    scope
  }
}

async function readCustomerToken(
  clientCredentials: ClientCredentials
): Promise<Token | null> {
  const cookieName = getKeyForCustomerToken(clientCredentials)

  // const searchParams = new window.URL(window.location.href).searchParams
  // const accessToken = searchParams.get('accessToken')
  // const scope = searchParams.get('scope') ?? clientCredentials.scope
  const { accessToken, scope = clientCredentials.scope } =
    getCustomerInfoFromUrl()

  const { payload } =
    accessToken != null ? parseToken(accessToken) : { payload: undefined }

  if (accessToken == null || payload?.owner == null) {
    return getToken(cookieName) ?? null
  }

  const token: Token = {
    type: 'customer',
    customerId: payload.owner.id,
    accessToken,
    scope
  }
  setToken(cookieName, token, new Date(payload.exp * 1000))

  return token
}

async function readGuestToken(
  clientCredentials: ClientCredentials
): Promise<Token> {
  const cookieName = getKeyForGuestToken(clientCredentials)
  const value = getToken(cookieName)

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

  const token: Token = {
    type: 'guest',
    accessToken,
    scope: clientCredentials.scope
  }
  setToken(cookieName, token, expires)

  return token
}

export const getAccessToken = memoize(
  async function (clientCredentials: ClientCredentials): Promise<Token> {
    let token = await readCustomerToken(clientCredentials)

    if (token == null) {
      token = await readGuestToken(clientCredentials)
    }

    fireEvent('cl-identity-gettoken', [], token)
    return token
  },
  (clientCredentials) => JSON.stringify(clientCredentials)
)

export async function createClient(
  config: Config
): Promise<CommerceLayerClient> {
  const token = await getAccessToken(config)

  return CommerceLayer({
    accessToken: token.accessToken,
    organization: config.slug,
    domain: config.domain
  })
}

export async function logout(): Promise<void> {
  const config = getConfig()
  const token = await getAccessToken(config)

  if (token.type === 'customer') {
    const cookieName = getKeyForCustomerToken(config)
    clearToken(cookieName)

    await revokeToken(config, token.accessToken)

    getAccessToken.cache.clear?.()
    // await getAccessToken(config)
  }
}
