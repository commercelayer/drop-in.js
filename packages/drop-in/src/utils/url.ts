/**
 * Get the closest `location.href`.
 * This will take into consideration pages that are rendered inside an iframe (e.g. Storybook stories).
 * @returns Url as string
 */
export function getClosestLocationHref(): string {
  const currentUrl = window.location.href

  let parentUrl: string | undefined

  try {
    parentUrl = window.parent.location.href
  } catch (_error) {}

  return parentUrl !== undefined && parentUrl !== currentUrl
    ? parentUrl
    : currentUrl
}
