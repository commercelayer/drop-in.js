import type { DropInArgs } from "@commercelayer/drop-in.js/dist/custom-elements-args"
import type { Meta, StoryFn } from "@storybook/html"
import { html, nothing } from "lit-html"
import { create } from "../../utils"
import { codes } from "../assets/constants"

type Args = DropInArgs["cl-price-amount"]

const meta: Meta<Args> = {
  title: "Components/Price/cl-price-amount",
  component: "cl-price-amount",
}

export default meta

export const Basic: StoryFn<Args> = (args) => {
  return create(html`
    <cl-price code=${codes.available}>
      <cl-price-amount type=${args.type ?? nothing}></cl-price-amount>
    </cl-price>
  `)
}
Basic.args = {}
