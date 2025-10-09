import type { Meta, StoryFn } from "@storybook/html-vite"
import { html } from "lit-html"
import { PARAM_KEY as DROP_IN_CSS_PARAM_KEY } from "../.storybook/addon-drop-in-css/constants"
import { PARAM_KEY as MINICART_CSS_PARAM_KEY } from "../.storybook/addon-minicart-css/constants"
import { getSelectedScopeValue } from "../.storybook/addon-scope-selector/constants"
import { create } from "../utils"
import { codes } from "./assets/constants"

const meta: Meta = {
  title: "Introduction",
}

export default meta

export const Basic: StoryFn = (_args, context) => {
  const baseUrl = location.href.substring(
    0,
    location.href.indexOf("/iframe.html"),
  )

  const dropInCssEnabled = context.globals[DROP_IN_CSS_PARAM_KEY]
  const minicartCssEnabled = context.globals[MINICART_CSS_PARAM_KEY]

  return create(
    html`
      ${dropInCssEnabled ? html`<link href="https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.css" rel="stylesheet" />` : ""}
      ${minicartCssEnabled ? html`<link href="https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/minicart.css" rel="stylesheet" />` : ""}

      <script type="module" src="https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.esm.js"></script>

      <script>
        window.commercelayerConfig = {
          clientId: 'kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8',
          scope: '${getSelectedScopeValue()}',
          debug: 'all', // default is 'none'
          defaultAttributes: {
            orders: {
              /**
              * The preferred language code (ISO 639-1) to be used when communicating with the customer.
              * If the language is supported, the hosted checkout will be localized accordingly.
              * @default 'en'
              */
              language_code: 'en',
              /**
              * The URL the cart's *Continue shopping* button points to. This is also used in the thank you page.
              * @optional
              */
              return_url: 'https://example.com'
            }
          }
        }
      </script>

      <!-- for demonstration purpose only -->
      <script src="https://cdn.tailwindcss.com"></script>

      <!-- header -->
      <nav class="flex p-6">
        <span class="font-semibold text-xl tracking-tight">Store Name</span>
        <div class="flex items-center flex-grow justify-end">
          <cl-identity-status type="guest" class="flex gap-2">
            <cl-identity-link type="login" target="_parent">
              Login
            </cl-identity-link>
            <cl-identity-link type="signup" target="_parent">
              Signup
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

        <!-- 1st product: Gray Five-Panel Cap with White Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              alt="Gray Five-Panel Cap with White Logo"
              src="https://data.commercelayer.app/seed/images/skus/${codes.outOfStock}_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">Gray Cap</h3>
          <small class="text-gray-300">${codes.outOfStock}</small>
          <cl-price code="${codes.outOfStock}" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart code="${codes.outOfStock}" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability code="${codes.outOfStock}" class="my-2 text-sm">
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

        <!-- 2nd product: White Backpack with Black Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              alt="White Backpack with Black Logo"
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

        <!-- 3rd product: BUNDLE -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64 flex justify-center">
            <img
              alt="Getting Started bundle"
              src="https://res.cloudinary.com/commercelayer/image/upload/v1681465805/demo-store/assets/white-glossy-mug-15oz-valentines-day.png"
              class="h-full object-center object-contain rounded-md"
            />
          </div>
          <h3 class="mt-6 font-medium">Getting Started bundle</h3>
          <small class="text-gray-300">${codes.bundleAvailable}</small>
          <cl-price kind="bundle" code="${codes.bundleAvailable}" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart kind="bundle" code="${codes.bundleAvailable}" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability kind="bundle" code="${codes.bundleAvailable}" class="my-2 text-sm">
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

      <!-- Editorial Banner -->
      <div class="flex flex-col items-center mt-8">
        <cl-identity-status class="h-full" type="guest">
          <cl-identity-link type="signup" target="_parent">
            <img class="object-contain position-top max-h-[470px]" src="${baseUrl}/register-h.jpg" alt="Register" />
          </cl-identity-link>
        </cl-identity-status>

        <cl-identity-status class="h-full" type="customer">
          <img class="object-contain position-top max-h-[470px]" src="${baseUrl}/welcomeback-h.jpg" alt="Welcome Back" />
        </cl-identity-status>
      </div>
    `,
  ).replaceAll("<!---->", "")
}
