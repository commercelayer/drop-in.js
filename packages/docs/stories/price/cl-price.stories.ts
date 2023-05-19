import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-price/cl-price'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = Props

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/Price/cl-price',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    code: {
      description:
        'The SKU code (i.e. the unique identifier of the product whose price you want to display).',
      type: { name: 'string', required: true },
      table: {
        category: 'attributes'
      }
    }
  }
}

export default meta

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-price code=${args.code ?? nothing}>
        <cl-price-amount type="compare-at"></cl-price-amount>
        <cl-price-amount type="price"></cl-price-amount>
      </cl-price>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  code: codes.available
}

export const NoDiscount = Template.bind({})
NoDiscount.args = {
  code: codes.noDiscount
}

export const WithoutAttributes = Template.bind({})
