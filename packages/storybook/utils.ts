import litHtml, { render } from 'lit-html'

export const create = (value: litHtml.TemplateResult): string => {
  const container = document.createElement('div')

  render(value, container)

  return container.innerHTML
}
