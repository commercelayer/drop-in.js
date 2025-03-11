import { html } from "common-tags"
import type litHtml from "lit-html"
import { render } from "lit-html"

export const create = (value: litHtml.TemplateResult): string => {
  const container = document.createElement("div")

  render(value, container)

  return html`
    ${container.innerHTML
      .replace("<!---->", "")
      .replace(/<!--\?lit\$[\s\S]*?-->/g, "")}
  `
}
