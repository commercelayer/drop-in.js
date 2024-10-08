import { getAccessToken } from '#apis/commercelayer/client'
import { getConfig, getOrganizationConfig } from '#apis/commercelayer/config'
import { getClosestLocationHref } from '#utils/url'

export async function getMyAccountUrl(): Promise<string | undefined> {
  const config = getConfig()
  const { accessToken, type } = await getAccessToken(config)

  if (type === 'guest') {
    return undefined
  }

  const organizationConfig = await getOrganizationConfig()
  const hostedUrl = `${config.appEndpoint}/my-account`

  return `${organizationConfig?.links?.my_account ?? hostedUrl}?accessToken=${accessToken}`
}

export async function getIdentityUrl(
  type: 'login' | 'signup' | 'logout'
): Promise<string | undefined> {
  const config = getConfig()

  if (type === 'logout') {
    return '#'
  }

  const organizationConfig = await getOrganizationConfig()
  const hostedUrl = `${config.appEndpoint}/identity`

  return `${organizationConfig?.links?.identity ?? hostedUrl}/${type}?clientId=${
    config.clientId
  }&scope=${config.scope}&returnUrl=${getClosestLocationHref()}`
}
