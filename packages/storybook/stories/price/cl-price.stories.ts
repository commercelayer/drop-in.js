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
      type: { name: 'string', required: false },
      table: {
        category: 'attributes'
      }
    }
  }
}

// export default meta

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
  sku: skus.bag
}

export const PriceAmount: StoryFn<Args & { type: 'compare-at' | 'price' }> = (
  args
) => {
  return create(
    html`
      <cl-price sku=${args.sku ?? nothing}>
        <cl-price-amount type=${args.type ?? nothing}></cl-price-amount>
      </cl-price>
    `
  )
}
PriceAmount.argTypes = {
  sku: {
    table: {
      disable: true
    }
  },
  type: {
    description: 'Type of displayed price.',
    type: {
      name: 'enum',
      value: ['price', 'compare-at'],
      required: false
    },
    control: { type: 'select' },
    table: {
      category: 'attributes',
      defaultValue: {
        summary: 'price'
      }
    }
  }
}
PriceAmount.args = {
  sku: skus.bag
}

export const WithoutAttributes = Template.bind({})
