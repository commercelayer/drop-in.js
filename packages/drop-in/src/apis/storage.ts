import type { ClientCredentials } from './commercelayer/client'

const prefix = 'commercelayer_'

export function getKeyForCart(clientCredentials: ClientCredentials): string {
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : clientCredentials.scope ?? 'undefined'

  return `${prefix}order-id-${clientCredentials.clientId}-${scope}`
}

export function getKeyForGuestToken(
  clientCredentials: ClientCredentials
): string {
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : clientCredentials.scope ?? 'undefined'

  return `${prefix}token-${clientCredentials.clientId}-${scope}`
}

export function getKeyForCustomerToken(
  clientCredentials: ClientCredentials
): string {
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : clientCredentials.scope ?? 'undefined'

  return `${prefix}session-${clientCredentials.clientId}-${scope}`
}
