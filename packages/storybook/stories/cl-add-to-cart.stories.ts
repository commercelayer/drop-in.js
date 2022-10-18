import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../utils'

interface Args {
  sku: string
  quantity: number
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/cl-add-to-cart',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    sku: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: { name: 'string', required: false },
      table: {
        category: 'attributes'
      }
    },
    quantity: {
      description: 'Number of units when adding to cart.',
      type: { name: 'number', required: false },
      table: {
        category: 'attributes',
        defaultValue: {
          summary: '1'
        }
      }
    }
  }
}

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-add-to-cart
        sku=${args.sku ?? nothing}
        quantity=${args.quantity ?? nothing}
      >
        Add to cart
      </cl-add-to-cart>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  sku: 'BACKPACK818488000000XXXX'
}

export const WithoutAttributes = Template.bind({})
