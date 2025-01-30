import type { AuthenticateOptions } from '@commercelayer/js-auth'
import { type Config } from './commercelayer/config'

const prefix = 'commercelayer_'

export function getKeyForCart(config: Config): string {
  const scope = (config.scope ?? 'undefined').replace(' ', '-')
  const suffix =
    config.storageOrderKeySuffix != null
      ? `-${config.storageOrderKeySuffix}`
      : ''

  return `${prefix}order-id-${config.clientId}-${scope}${suffix}`
}

export function getKeyForGuestToken(
  clientCredentials: AuthenticateOptions<'client_credentials'>
): string {
  const scope = (clientCredentials.scope ?? 'undefined').replace(' ', '-')

  return `${prefix}token-${clientCredentials.clientId}-${scope}`
}

export function getKeyForCustomerToken(
  clientCredentials: AuthenticateOptions<'client_credentials'>
): string {
  const scope = (clientCredentials.scope ?? 'undefined').replace(' ', '-')

  return `${prefix}session-${clientCredentials.clientId}-${scope}`
}
