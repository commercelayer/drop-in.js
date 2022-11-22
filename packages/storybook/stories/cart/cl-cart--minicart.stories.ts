import { Meta, StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'

type Args = GlobalArgs & {}

export const meta: Meta<Args> = {
  title: 'Components/Cart/cl-cart (minicart)',
  argTypes: {
    'Use minicart.css': {
      table: {
        disable: false
      }
    }
  }
}

export const Basic: StoryFn<Args> = () => {
  return create(
    html`
      <cl-cart-link>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M4 10H28"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M21 14C21 15.3261 20.4732 16.5979 19.5355 17.5355C18.5979 18.4732 17.3261 19 16 19C14.6739 19 13.4021 18.4732 12.4645 17.5355C11.5268 16.5979 11 15.3261 11 14"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>

        <cl-cart-count></cl-cart-count>
        <cl-cart></cl-cart>
      </cl-cart-link>
    `
  )
}
Basic.args = {
  'Use drop-in.css': true,
  'Use minicart.css': true
}
