import { makeSalesChannel } from "@commercelayer/js-auth"
import CommerceLayer, {
  bundles,
  type Customer,
  customers,
  line_items,
  orders,
  organization,
  prices,
  skus,
} from "@commercelayer/sdk"
import Cookies from "js-cookie"
import { memoize } from "lodash-es"
import { fireEvent } from "@/apis/event"
import { pDebounce } from "@/utils/debounce"
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
  (clientCredentials: Parameters<typeof makeSalesChannel>[0]) =>
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

const configToClientCredentials = (config: Config) => ({
  clientId: config.clientId,
  scope: config.scope,
  debug: config.debug !== "none",
  domain: config.domain,
})

export const getAccessToken = memoize(
  async (config: Config): Promise<Token> => {
    const clientCredentials = configToClientCredentials(config)
    const salesChannel = getSalesChannel(clientCredentials)
    let token = await salesChannel.getAuthorization()

    const { accessToken, scope = config.scope } = getCustomerInfoFromUrl()

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

export async function createClient(config: Config) {
  const token = await getAccessToken(config)

  CommerceLayer({
    accessToken: token.accessToken,
    domain: config.domain,
    fetch: async (input, init) => {
      const response = await fetch(input, init)

      if (response.status === 401) {
        const config = getConfig()
        const clientCredentials = configToClientCredentials(config)
        const salesChannel = getSalesChannel(clientCredentials)
        await salesChannel.removeAuthorization()

        window.location.reload()
      }

      return response
    },
  })

  return {
    bundles,
    customers,
    line_items,
    orders,
    organization,
    prices,
    skus,
  }
}

export const customerFields = [
  "email",
  "metadata",
] as const satisfies (keyof Customer)[]

async function _getCustomer(): Promise<Customer | null> {
  const config = getConfig()
  const token = await getAccessToken(config)

  if (token.ownerType === "customer") {
    const client = await createClient(config)
    return await client.customers.retrieve(token.ownerId, {
      fields: customerFields,
    })
  }

  return null
}

export const getCustomer = memoize(
  pDebounce(_getCustomer, { wait: 10, maxWait: 50 }),
)

export async function logout(): Promise<void> {
  const config = getConfig()
  const clientCredentials = configToClientCredentials(config)
  const salesChannel = getSalesChannel(clientCredentials)
  const token = await getAccessToken(config)

  if (token.ownerType === "customer") {
    await salesChannel.logoutCustomer()

    getAccessToken.cache.clear?.()
    // await getAccessToken(config)
  }
}
