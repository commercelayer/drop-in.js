import { getAccessToken } from "#apis/commercelayer/client"
import { getConfig, getOrganizationConfig } from "#apis/commercelayer/config"
import { getClosestLocationHref } from "#utils/url"

export async function getMyAccountUrl(): Promise<string | undefined> {
  const config = getConfig()
  const { type } = await getAccessToken(config)

  if (type === "guest") {
    return undefined
  }

  const organizationConfig = await getOrganizationConfig()
  const lang = config.defaultAttributes?.orders?.language_code

  return `${organizationConfig.links.my_account}${lang != null ? `&lang=${lang}` : ""}`
}

export async function getIdentityUrl(
  type: "login" | "signup" | "logout",
  scope?: string,
): Promise<string | undefined> {
  const config = getConfig()

  if (type === "logout") {
    return "#"
  }

  const organizationConfig = await getOrganizationConfig()
  const lang = config.defaultAttributes?.orders?.language_code

  return `${organizationConfig.links.identity}/${type}?clientId=${
    config.clientId
  }&scope=${scope ?? config.scope}&publicScope=${config.scope}&returnUrl=${getClosestLocationHref()}${lang != null ? `&lang=${lang}` : ""}`
}
