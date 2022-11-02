/* eslint-disable prettier/prettier */

import { Meta, StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../utils'

export const meta: Meta = {
  title: 'demo'
}

export const Basic: StoryFn = () => {
  return create(
    html`
      <!-- for demonstration purpose only -->
      <script src="https://cdn.tailwindcss.com"></script>

      <!-- header -->
      <nav class="flex p-6">
        <span class="font-semibold text-xl tracking-tight">Store Name</span>
        <div class="flex items-center flex-grow justify-end">
          <cl-cart-link target="_blank" aria-label="Cart">
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
              <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 23H8.725L5.238 3.825A1 1 0 0 0 4.261 3H2M10 28a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM23 28a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
              <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.813 18h15.7a1.988 1.988 0 0 0 1.962-1.637L27 8H6"/>
            </svg>
            <cl-cart-count></cl-cart-count>
          </cl-cart-link>
        </div>
      </nav>


      <!-- product list -->
      <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">

        <!-- 1st product: Black Five-Panel Cap with White Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              src="https://data.commercelayer.app/seed/images/skus/5PANECAP000000FFFFFFXXXX_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">Black Five-Panel Cap with White Logo</h3>
          <small class="text-gray-300">5PANECAP000000FFFFFFXXXX</small>
          <cl-price sku="5PANECAP000000FFFFFFXXXX" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart sku="5PANECAP000000FFFFFFXXXX" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability sku="5PANECAP000000FFFFFFXXXX" class="my-2">
            <cl-availability-status type="available">available</cl-availability-status>
            <cl-availability-status type="unavailable">unavailable</cl-availability-status>
            <cl-availability-message
              format="days"
              message="ready to be shipped in {min}-{max} days"
              class="block"
            ></cl-availability-message>
          </cl-availability>
        </div>

        <!-- 2nd product: Gray Five-Panel Cap with White Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              src="https://data.commercelayer.app/seed/images/skus/5PANECAP9D9CA1FFFFFFXXXX_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">Gray Five-Panel Cap with White Logo</h3>
          <small class="text-gray-300">5PANECAP9D9CA1FFFFFFXXXX</small>
          <cl-price sku="5PANECAP9D9CA1FFFFFFXXXX" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart sku="5PANECAP9D9CA1FFFFFFXXXX" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability sku="5PANECAP9D9CA1FFFFFFXXXX" class="my-2">
            <cl-availability-status type="available">available</cl-availability-status>
            <cl-availability-status type="unavailable">unavailable</cl-availability-status>
            <cl-availability-message
              format="days"
              message="ready to be shipped in {min}-{max} days"
              class="block"
            ></cl-availability-message>
          </cl-availability>
        </div>

        <!-- 3rd product: White Backpack with Black Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              src="https://data.commercelayer.app/seed/images/skus/BACKPACKFFFFFF000000XXXX_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">White Backpack with Black Logo</h3>
          <small class="text-gray-300">BACKPACKFFFFFF000000XXXX</small>
          <cl-price sku="BACKPACKFFFFFF000000XXXX" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart sku="BACKPACKFFFFFF000000XXXX" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability sku="BACKPACKFFFFFF000000XXXX" class="my-2">
            <cl-availability-status type="available">available</cl-availability-status>
            <cl-availability-status type="unavailable">unavailable</cl-availability-status>
            <cl-availability-message
              format="days"
              message="ready to be shipped in {min}-{max} days"
              class="block"
            ></cl-availability-message>
          </cl-availability>
        </div>

      </section>
    `,
    false
  )
}
Basic.args = {
  styles: true
}