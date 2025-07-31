import type { DropInArgs } from "@commercelayer/drop-in.js/dist/custom-elements-args"
import type { Meta, StoryFn } from "@storybook/html-vite"
import { html, nothing } from "lit-html"
import { create } from "../../utils"

type Args = DropInArgs["cl-checkout-link"]

const meta: Meta<Args> = {
  title: "Components/Checkout/cl-checkout-link",
  component: "cl-checkout-link",
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(html`
    <cl-checkout-link target=${args.target ?? nothing}>
      Proceed to checkout
    </cl-checkout-link>
  `)
}

export const Basic = Template.bind({})
Basic.args = {
  target: "_blank",
}
