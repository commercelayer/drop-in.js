import { getAccessToken } from "@/apis/commercelayer/client"
import { getConfig, getOrganizationConfig } from "@/apis/commercelayer/config"
import { getClosestLocationHref } from "@/utils/url"

export async function getMyAccountUrl({
  returnUrl,
}: {
  returnUrl?: string
}): Promise<string | undefined> {
  const config = getConfig()
  const { ownerType } = await getAccessToken(config)

  if (ownerType === "guest") {
    return undefined
  }

  const organizationConfig = await getOrganizationConfig({
    returnUrl,
  })

  return organizationConfig.links.my_account
}

export async function getIdentityUrl(
  type: "login" | "signup" | "logout",
  scope?: string,
  resetPasswordUrl?: string,
): Promise<string | undefined> {
  const config = getConfig()

  if (type === "logout") {
    return "#"
  }

  const organizationConfig = await getOrganizationConfig({
    identityType: type,
    clientId: config.clientId,
    scope: scope ?? config.scope,
    resetPasswordUrl,
    returnUrl: getClosestLocationHref(),
    publicScope: config.scope,
  })

  return organizationConfig.links.identity
}
