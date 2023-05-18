import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-add-to-cart/cl-add-to-cart'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = GlobalArgs & Props

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Add to cart/cl-add-to-cart',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    code: {
      description:
        'The SKU code (i.e. the unique identifier of the product you want to add to the shopping cart).',
      type: { name: 'string', required: true },
      table: {
        category: 'attributes'
      }
    },
    quantity: {
      description:
        'The number of units of the selected product you want to add to the shopping cart.',
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
        code=${args.code ?? nothing}
        quantity=${args.quantity ?? nothing}
      >
        Add to cart
      </cl-add-to-cart>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  'Use drop-in.css': true,
  code: codes.available
}

export const WithoutAttributes = Template.bind({})

export const OutOfStock = Template.bind({})
OutOfStock.args = {
  code: codes.outOfStock
}

export const Nonexisting = Template.bind({})
Nonexisting.args = {
  code: codes.nonexisting
}

export const NoOverselling = Template.bind({})
NoOverselling.args = {
  code: codes.noOverselling,
  quantity: 100
}

export const DoNotTrack = Template.bind({})
DoNotTrack.args = {
  code: codes.doNotTrack,
  quantity: 9999
}
