import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { skus } from '../assets/constants'

interface Args {
  sku?: string
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Price/cl-price',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    sku: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: { name: 'string', required: true },
      table: {
        category: 'attributes'
      }
    }
  }
}

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-price sku=${args.sku ?? nothing}>
        <cl-price-amount type="compare-at"></cl-price-amount>
        <cl-price-amount type="price"></cl-price-amount>
      </cl-price>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  sku: skus.cap
}

export const NoDiscount = Template.bind({})
NoDiscount.args = {
  sku: skus.backpack
}

export const WithoutAttributes = Template.bind({})
