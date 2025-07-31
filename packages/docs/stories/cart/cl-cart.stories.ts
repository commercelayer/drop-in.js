import type { DropInArgs } from "@commercelayer/drop-in.js/dist/custom-elements-args"
import type { Meta, StoryFn } from "@storybook/html-vite"
import { html, nothing } from "lit-html"
import { create } from "../../utils"

type Args = DropInArgs["cl-cart"]

const meta: Meta<Args> = {
  title: "Components/Cart/cl-cart",
  component: "cl-cart",
}

export default meta

export const Basic: StoryFn<Args> = (args) => {
  return create(html`
    <cl-cart
      type=${args.type ?? nothing}
      open=${args.open ?? nothing}
      open-on-add=${args["open-on-add"] ?? nothing}
    ></cl-cart>
  `)
}
