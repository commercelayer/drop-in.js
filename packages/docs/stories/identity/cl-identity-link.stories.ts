import type { DropInArgs } from "@commercelayer/drop-in.js/dist/custom-elements-args"
import type { Meta, StoryFn } from "@storybook/html"
import { html, nothing } from "lit-html"
import { getSelectedScopeValue } from "../../.storybook/addon-scope-selector/constants"
import { create } from "../../utils"
import { codes } from "../assets/constants"

type Args = DropInArgs["cl-identity-link"]

const meta: Meta<Args> = {
  title: "Components/Identity/cl-identity-link",
  component: "cl-identity-link",
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(html`
    <cl-identity-link
      type=${args.type ?? nothing}
      target=${args.target ?? nothing}
      scope=${args.scope ?? nothing}
    >
      Identity link
    </cl-identity-link>
  `)
}

export const Basic = Template.bind({})
Basic.args = {
  type: "login",
  target: "_parent",
}

export const WithoutAttributes = Template.bind({})

export const PrivateScope: StoryFn = () => {
  return create(
    html`
      <!-- for demonstration purpose only -->
      <script src="https://cdn.tailwindcss.com"></script>

      <!-- header -->
      <nav class="flex p-6">
        <span class="font-semibold text-xl tracking-tight">Employee Store</span>
        <div class="flex items-center flex-grow justify-end">
          <cl-identity-status type="guest" class="flex gap-2">
            <cl-identity-link type="login" target="_parent" scope="${getSelectedScopeValue()}-employees">
              Login
            </cl-identity-link>
          </cl-identity-status>
          <cl-identity-status type="customer" class="flex gap-2">
            <cl-my-account-link target="_blank">
              My Account
            </cl-my-account-link>
            <cl-identity-link type="logout">
              Logout
            </cl-identity-link>
          </cl-identity-status>
          <cl-cart-link target="_blank" aria-label="Cart" class="ml-4">
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
              <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 23H8.725L5.238 3.825A1 1 0 0 0 4.261 3H2M10 28a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM23 28a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
              <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.813 18h15.7a1.988 1.988 0 0 0 1.962-1.637L27 8H6"/>
            </svg>
            <cl-cart-count hide-when-empty></cl-cart-count>
            <cl-cart open-on-add></cl-cart>
          </cl-cart-link>
        </div>
      </nav>


      <!-- product list -->
      <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">

        <!-- 2nd product: White Backpack with Black Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              src="https://data.commercelayer.app/seed/images/skus/${codes.noDiscount}_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">White Backpack</h3>
          <small class="text-gray-300">${codes.noDiscount}</small>
          <cl-price code="${codes.noDiscount}" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart code="${codes.noDiscount}" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability code="${codes.noDiscount}" class="my-2 text-sm">
            <cl-availability-status type="available" class="text-green-400">available</cl-availability-status>
            <cl-availability-status type="unavailable" class="text-red-400">unavailable</cl-availability-status>
            <cl-availability-status type="available-with-info" class="block">
              ready to be shipped in
              <cl-availability-info type="min-days"></cl-availability-info
              >-<cl-availability-info type="max-days"></cl-availability-info>
              days
            </cl-availability-status>
          </cl-availability>
        </div>

      </section>
    `,
  )
}
