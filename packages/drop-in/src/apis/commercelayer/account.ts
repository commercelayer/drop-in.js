import { getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'

export async function getMyAccountUrl(): Promise<string | undefined> {
  const config = getConfig()
  const { accessToken, type } = await getAccessToken(config)

  if (type === 'guest') {
    return undefined
  }

  return `${config.appEndpoint}/my-account?accessToken=${accessToken}`
}

export async function getIdentityUrl(
  type: 'login' | 'sign-up' | 'logout'
): Promise<string | undefined> {
  const config = getConfig()

  return `${config.appEndpoint}/identity/${type}?clientId=${
    config.clientId
  }&scope=${config.scope}&returnUrl=${config.returnUrl ?? ''}`
}
