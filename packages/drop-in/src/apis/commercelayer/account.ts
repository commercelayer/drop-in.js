import { getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'

export async function getMyAccountUrl(): Promise<string | undefined> {
  const config = getConfig()
  const accessToken = await getAccessToken(config)

  return `${config.appEndpoint}/my-account?accessToken=${accessToken}`
}
