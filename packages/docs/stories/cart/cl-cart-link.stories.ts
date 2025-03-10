import type { DropInArgs } from "@commercelayer/drop-in.js/dist/custom-elements-args"
import type { Meta, StoryFn } from "@storybook/html"
import { html, nothing } from "lit-html"
import { create } from "../../utils"

type Args = DropInArgs["cl-cart-link"]

const meta: Meta<Args> = {
  title: "Components/Cart/cl-cart-link",
  component: "cl-cart-link",
}

export default meta

export const Basic: StoryFn<Args> = (args) => {
  return create(html`
    <cl-cart-link target=${args.target ?? nothing}>View cart</cl-cart-link>
  `)
}
Basic.args = {
  target: "_blank",
}

export const WithIcon: StoryFn<Args> = (args) => {
  return create(html`
    <cl-cart-link target=${args.target ?? nothing}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 23H8.725L5.2375 3.825C5.1967 3.59537 5.07691 3.38722 4.89887 3.23657C4.72082 3.08592 4.49572 3.00223 4.2625 3H2"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 28C11.3807 28 12.5 26.8807 12.5 25.5C12.5 24.1193 11.3807 23 10 23C8.61929 23 7.5 24.1193 7.5 25.5C7.5 26.8807 8.61929 28 10 28Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23 28C24.3807 28 25.5 26.8807 25.5 25.5C25.5 24.1193 24.3807 23 23 23C21.6193 23 20.5 24.1193 20.5 25.5C20.5 26.8807 21.6193 28 23 28Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.8125 18H23.5125C23.98 18.0014 24.433 17.838 24.7919 17.5386C25.1508 17.2391 25.3927 16.8227 25.475 16.3625L27 8H6"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </cl-cart-link>
  `)
}
WithIcon.args = {
  target: "_blank",
}
