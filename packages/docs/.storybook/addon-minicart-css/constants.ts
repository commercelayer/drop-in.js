export const DESCRIPTION = 'Toggle this switch to *simulate* in this page how the components would look when importing the `minicart.css` into your website.'
export const ADDON_ID = 'addon-minicart-css' as const
export const FILENAME = 'minicart.css' as const
// export const ADDON_TITLE = `Enable \`${FILENAME}\`` as const
export const ADDON_TITLE = DESCRIPTION
export const TOOL_ID = `${ADDON_ID}/tool` as const
export const PARAM_KEY = ADDON_ID
