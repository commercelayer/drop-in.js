import type { DropInArgs } from "@commercelayer/drop-in.js/dist/custom-elements-args"
import type { Meta, StoryFn } from "@storybook/html-vite"
import { html, nothing } from "lit-html"
import { create } from "../../utils"

type Args = DropInArgs["cl-identity-info"]

const meta: Meta<Args> = {
  title: "Components/Identity/cl-identity-info",
  component: "cl-identity-info",
}

export default meta

export const Basic: StoryFn<Args> = (args) => {
  return create(html`
    <cl-identity-info
      field=${args.field ?? nothing}
    ></cl-identity-info>
  `)
}
Basic.args = {
  field: "email",
}
