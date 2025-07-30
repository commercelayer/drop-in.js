import {
  type AuthenticateOptions,
  type AuthenticateReturn,
  authenticate,
  jwtDecode,
  jwtIsSalesChannel,
  revoke,
} from "@commercelayer/js-auth"
import CommerceLayer, { type CommerceLayerClient } from "@commercelayer/sdk"
import Cookies from "js-cookie"
import memoize from "lodash/memoize"
import { fireEvent } from "#apis/event"
import { getKeyForCustomerToken, getKeyForGuestToken } from "#apis/storage"
import { type Config, getConfig } from "./config"

export type Token = (
  | {
      type: "guest"
    }
  | {
      type: "customer"
      customerId: string
    }
) & {
  accessToken: string
  scope?: string
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
  } catch (_e) {
    return undefined
  }
}

async function revokeToken(
  clientCredentials: AuthenticateOptions<"client_credentials">,
  accessToken: string,
): Promise<boolean> {
  const res = await revoke({
    clientId: clientCredentials.clientId,
    token: accessToken,
  })

  return res.errors == null
}

async function getSalesChannelToken(
  clientCredentials: AuthenticateOptions<"client_credentials">,
): Promise<AuthenticateReturn<"client_credentials"> | null> {
  return await authenticate("client_credentials", {
    clientId: clientCredentials.clientId,
    scope: clientCredentials.scope,
    domain: clientCredentials.domain,
  }).then((res) => (res.errors == null ? res : null))
}

const getCustomerInfoFromUrl = (): {
  accessToken: string | undefined
  scope: string | undefined
} => {
  const url = new URL(window.location.href)
  const { searchParams } = url
  const accessToken = searchParams.get("accessToken") ?? undefined
  const scope = searchParams.get("scope") ?? undefined

  searchParams.delete("accessToken")
  searchParams.delete("scope")
  window.history.replaceState({}, "", url.toString())

  return {
    accessToken,
    scope,
  }
}

async function readCustomerToken(
  clientCredentials: AuthenticateOptions<"client_credentials">,
): Promise<Token | null> {
  const cookieName = getKeyForCustomerToken(clientCredentials)
  const cookieValue = getToken(cookieName) ?? null

  // const searchParams = new window.URL(window.location.href).searchParams
  // const accessToken = searchParams.get('accessToken')
  // const scope = searchParams.get('scope') ?? clientCredentials.scope
  const { accessToken, scope = clientCredentials.scope } =
    getCustomerInfoFromUrl()

  if (accessToken == null) {
    return cookieValue
  }

  const jwt = jwtDecode(accessToken)

  if (jwtIsSalesChannel(jwt.payload) && jwt.payload.owner != null) {
    const token: Token = {
      type: "customer",
      customerId: jwt.payload.owner.id,
      accessToken,
      scope,
    }

    setToken(cookieName, token, new Date(jwt.payload.exp * 1000))

    return token
  }

  return cookieValue
}

async function readGuestToken(
  clientCredentials: AuthenticateOptions<"client_credentials">,
): Promise<Token> {
  const cookieName = getKeyForGuestToken(clientCredentials)
  const value = getToken(cookieName)

  if (value !== undefined) {
    return value
  }

  const salesChannelToken = await getSalesChannelToken(clientCredentials).catch(
    (error) => {
      throw new Error(
        `Cannot get a sales channel token. ${error.body.error}. ${error.body.error_description}`,
      )
    },
  )

  if (salesChannelToken == null) {
    throw new Error("Unable to get a valid sales channel token.")
  }

  const { accessToken, expires } = salesChannelToken

  const token: Token = {
    type: "guest",
    accessToken,
    scope: clientCredentials.scope,
  }
  setToken(cookieName, token, expires)

  return token
}

export const getAccessToken = memoize(
  async (
    clientCredentials: AuthenticateOptions<"client_credentials">,
  ): Promise<Token> => {
    let token = await readCustomerToken(clientCredentials)

    if (token == null) {
      token = await readGuestToken(clientCredentials)
    }

    fireEvent("cl-identity-gettoken", [], token)
    return token
  },
  (clientCredentials) => JSON.stringify(clientCredentials),
)

export async function createClient(
  config: Config,
): Promise<CommerceLayerClient> {
  const token = await getAccessToken(config)

  return CommerceLayer({
    accessToken: token.accessToken,
    domain: config.domain,
  })
}

export async function logout(): Promise<void> {
  const config = getConfig()
  const token = await getAccessToken(config)

  if (token.type === "customer") {
    const cookieName = getKeyForCustomerToken(config)
    clearToken(cookieName)

    await revokeToken(config, token.accessToken)

    getAccessToken.cache.clear?.()
    // await getAccessToken(config)
  }
}
