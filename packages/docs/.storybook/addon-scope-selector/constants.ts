export const DESCRIPTION = 'Toggle this switch to change the market in scope.'
export const ADDON_ID = 'addon-scope-selector' as const
export const ADDON_TITLE = DESCRIPTION
export const TOOL_ID = `${ADDON_ID}/tool` as const
export const PARAM_KEY = ADDON_ID
export const SCOPES = {
  'market: USA': 'market:11709',
  'market: Europe': 'market:11708'
} as const

export type Scope = keyof typeof SCOPES

export function getSelectedScopeKey() {
  const fromLocalStorage = localStorage.getItem(PARAM_KEY) ?? ''
  const availableScopes = Object.keys(SCOPES)

  return (availableScopes.includes(fromLocalStorage) ? fromLocalStorage : availableScopes[0]) as Scope
}

export function getSelectedScopeValue() {
  const selectedScopeKey = getSelectedScopeKey()
  return SCOPES[selectedScopeKey]
}
