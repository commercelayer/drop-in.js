import { Meta, StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../utils'

interface Args {
  sku: string
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/cl-price',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    sku: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: { name: 'string', required: false },
      table: {
        category: 'component props'
      }
    }
  }
}

export default meta

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-price sku="${args.sku}">
        The price was:
        <cl-price-amount type="compare-at"></cl-price-amount>
        <br />
        Now the price is:
        <cl-price-amount></cl-price-amount>
      </cl-price>
    `
  )
}

export const WithSku = Template.bind({})
WithSku.args = {
  sku: 'BACKPACK818488000000XXXX'
}

export const WithoutArgs = Template.bind({})
