/* eslint-disable prettier/prettier */

import { Meta, StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../utils'
import type { Args as GlobalArgs } from '../.storybook/preview'
import { codes } from './assets/constants'

type Args = GlobalArgs & {}

export const meta: Meta<Args> = {
  title: 'introduction'
}

export const Basic: StoryFn<Args> = () => {
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
              src="https://data.commercelayer.app/seed/images/skus/${codes.available}_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">Black Five-Panel Cap with White Logo</h3>
          <small class="text-gray-300">${codes.available}</small>
          <cl-price code="${codes.available}" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart code="${codes.available}" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability code="${codes.available}" class="my-2">
            <cl-availability-status type="available" class="text-green-400">available</cl-availability-status>
            <cl-availability-status type="unavailable" class="text-red-400">unavailable</cl-availability-status>
            <cl-availability-status type="available" class="block">
              ready to be shipped in
              <cl-availability-info type="min-days"></cl-availability-info
              // eslint-disable-next-line prettier/prettier
              >-<cl-availability-info type="max-days"></cl-availability-info>
              days
            </cl-availability-status>
          </cl-availability>
        </div>

        <!-- 2nd product: Gray Five-Panel Cap with White Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              src="https://data.commercelayer.app/seed/images/skus/${codes.outOfStock}_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">Gray Five-Panel Cap with White Logo</h3>
          <small class="text-gray-300">${codes.outOfStock}</small>
          <cl-price code="${codes.outOfStock}" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart code="${codes.outOfStock}" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability code="${codes.outOfStock}" class="my-2">
            <cl-availability-status type="available" class="text-green-400">available</cl-availability-status>
            <cl-availability-status type="unavailable" class="text-red-400">unavailable</cl-availability-status>
            <cl-availability-status type="available" class="block">
              ready to be shipped in
              <cl-availability-info type="min-days"></cl-availability-info
              // eslint-disable-next-line prettier/prettier
              >-<cl-availability-info type="max-days"></cl-availability-info>
              days
            </cl-availability-status>
          </cl-availability>
        </div>

        <!-- 3rd product: White Backpack with Black Logo -->
        <div class="flex flex-col">
          <div class="h-80 sm:h-64">
            <img
              src="https://data.commercelayer.app/seed/images/skus/${codes.noDiscount}_FLAT.png"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <h3 class="mt-6 font-medium">White Backpack with Black Logo</h3>
          <small class="text-gray-300">${codes.noDiscount}</small>
          <cl-price code="${codes.noDiscount}" class="my-2">
            <cl-price-amount type="compare-at"></cl-price-amount>
            <cl-price-amount type="price"></cl-price-amount>
          </cl-price>
          <cl-add-to-cart code="${codes.noDiscount}" class="my-2 mx-auto">
            Add to cart
          </cl-add-to-cart>
          <cl-availability code="${codes.noDiscount}" class="my-2">
            <cl-availability-status type="available" class="text-green-400">available</cl-availability-status>
            <cl-availability-status type="unavailable" class="text-red-400">unavailable</cl-availability-status>
            <cl-availability-status type="available" class="block">
              ready to be shipped in
              <cl-availability-info type="min-days"></cl-availability-info
              // eslint-disable-next-line prettier/prettier
              >-<cl-availability-info type="max-days"></cl-availability-info>
              days
            </cl-availability-status>
          </cl-availability>
        </div>

      </section>
    `,
    false
  )
}

Basic.args = {
  'Use drop-in.css': true
}

// Basic.parameters = {
//   docs: {
//     inlineStories: false,
//     iframeHeight: '100vh'
//   }
// }
