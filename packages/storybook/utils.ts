import litHtml, { render } from 'lit-html'

export const create = (
  value: litHtml.TemplateResult,
  removeComments: boolean | undefined = true
): string => {
  const container = document.createElement('div')

  render(value, container)

  if (removeComments) {
    return container.innerHTML
      .replace(/^[\s]+<!--[\s\S]*?-->\n/gm, '')
      .replace(/<!--[\s\S]*?-->/g, '')
  }

  return container.innerHTML.replace('<!---->', '')
}
