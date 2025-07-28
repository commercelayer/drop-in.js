import {
  type AuthenticateOptions,
  makeSalesChannel,
} from "@commercelayer/js-auth"
import CommerceLayer, { type CommerceLayerClient } from "@commercelayer/sdk"
import Cookies from "js-cookie"
import memoize from "lodash/memoize"
import { fireEvent } from "#apis/event"
import { type Config, getConfig } from "./config"

export type Token = (
  | {
      ownerType: "guest"
    }
  | {
      ownerType: "customer"
      ownerId: string
    }
) & {
  accessToken: string
  scope?: string
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

const getSalesChannel = memoize(
  (clientCredentials) =>
    makeSalesChannel(clientCredentials, {
      async getKey(configuration, type) {
        const scope = (configuration.scope ?? "undefined").replace(" ", "-")
        const t = type === "guest" ? "token" : "session"

        return `commercelayer_${t}-${configuration.clientId}-${scope}`
      },
      storage: {
        async getItem(key: string) {
          return JSON.parse(Cookies.get(key) ?? "null")
        },
        async removeItem(key) {
          Cookies.remove(key)
        },
        async setItem(key, value) {
          Cookies.set(key, JSON.stringify(value))
        },
      },
    }),
  (clientCredentials) => JSON.stringify(clientCredentials),
)

export const getAccessToken = memoize(
  async (
    clientCredentials: AuthenticateOptions<"client_credentials">,
  ): Promise<Token> => {
    const salesChannel = getSalesChannel(clientCredentials)
    let token = await salesChannel.getAuthorization()

    const { accessToken, scope = clientCredentials.scope } =
      getCustomerInfoFromUrl()

    if (accessToken != null && scope != null) {
      token = await salesChannel.setCustomer({
        accessToken,
        scope,
      })
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
  const salesChannel = getSalesChannel(config)
  const token = await getAccessToken(config)

  if (token.ownerType === "customer") {
    await salesChannel.logoutCustomer()

    getAccessToken.cache.clear?.()
    // await getAccessToken(config)
  }
}
