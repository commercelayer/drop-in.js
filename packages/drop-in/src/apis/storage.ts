import type { AuthenticateOptions } from '@commercelayer/js-auth'

const prefix = 'commercelayer_'

export function getKeyForCart(
  clientCredentials: AuthenticateOptions<'client_credentials'>
): string {
  const scope = (clientCredentials.scope ?? 'undefined').replace(' ', '-')

  return `${prefix}order-id-${clientCredentials.clientId}-${scope}`
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
