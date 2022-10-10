import type { ClientCredentials } from '@commercelayer/js-auth'

const prefix = 'commercelayer_'

// TODO: shall we manage the country?
export function getKeyForCart(): string {
  return `${prefix}order-id`
}

export function getKeyForAccessToken(
  clientCredentials: ClientCredentials
): string {
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : clientCredentials.scope ?? 'undefined'

  return `${prefix}token-${clientCredentials.clientId}-${scope}`
}
