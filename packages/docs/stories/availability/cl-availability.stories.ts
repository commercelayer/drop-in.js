import type { DropInArgs } from "@commercelayer/drop-in.js/dist/custom-elements-args"
import type { Meta, StoryFn } from "@storybook/html"
import { html, nothing } from "lit-html"
import { create } from "../../utils"
import { codes } from "../assets/constants"

type Args = DropInArgs["cl-availability"]

const meta: Meta<Args> = {
  title: "Components/Availability/cl-availability",
  component: "cl-availability",
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-availability kind=${args.kind ?? nothing} code=${args.code ?? nothing} rule=${args.rule ?? nothing}>
        <cl-availability-status type="available" style="color: green;">
          • available
        </cl-availability-status>
        <cl-availability-status type="available-with-info">
          ready to be shipped in
          <cl-availability-info type="min-days"></cl-availability-info
          >-<cl-availability-info type="max-days"></cl-availability-info> days
          with <cl-availability-info type="shipping-method-name"></cl-availability-info> (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
        </cl-availability-status>
        <cl-availability-status type="unavailable" style="color: red;">
          • out of stock
        </cl-availability-status>
      </cl-availability>
    `,
  )
}

export const Basic = Template.bind({})
Basic.args = {
  code: codes.available,
}

export const WithoutAttributes = Template.bind({})
