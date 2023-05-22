import type litHtml from 'lit-html'
import { render } from 'lit-html'
import { html } from 'common-tags'

export const create = (value: litHtml.TemplateResult): string => {
  const container = document.createElement('div')

  render(value, container)

  return html`
    ${container.innerHTML
      .replace('<!---->', '')
      .replace(/<!--\?lit\$[\s\S]*?-->/g, '')}
  `
}
