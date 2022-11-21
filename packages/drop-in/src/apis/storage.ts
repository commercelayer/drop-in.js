import type { ClientCredentials } from '@commercelayer/js-auth'

const prefix = 'commercelayer_'

export function getKeyForCart(clientCredentials: ClientCredentials): string {
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : clientCredentials.scope ?? 'undefined'

  return `${prefix}order-id-${clientCredentials.clientId}-${scope}`
}

export function getKeyForAccessToken(
  clientCredentials: ClientCredentials
): string {
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : clientCredentials.scope ?? 'undefined'

  return `${prefix}token-${clientCredentials.clientId}-${scope}`
}
