const prefix = 'commercelayer_';
// TODO: shall we manage the country?
export function getKeyForCart() {
  return `${prefix}order-id`;
}
export function getKeyForAccessToken(clientCredentials) {
  var _a;
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : (_a = clientCredentials.scope) !== null && _a !== void 0 ? _a : 'undefined';
  return `${prefix}token-${clientCredentials.clientId}-${scope}`;
}
