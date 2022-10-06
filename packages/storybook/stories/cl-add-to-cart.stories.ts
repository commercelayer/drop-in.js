import { Meta, StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../utils'

interface Args {
  sku: string
  quantity: number
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/cl-add-to-cart',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    sku: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: { name: 'string', required: false }
    },
    quantity: {
      description: 'Number of units when adding to cart',
      type: { name: 'number', required: false }
    }
  }
}

export default meta

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-add-to-cart sku="${args.sku}" quantity="${args.quantity}">
        Add to cart
      </cl-add-to-cart>
    `
  )
}

export const WithSku = Template.bind({})
WithSku.args = {
  sku: 'BACKPACK818488000000XXXX',
  quantity: 1
}

export const WithoutArgs = Template.bind({})
