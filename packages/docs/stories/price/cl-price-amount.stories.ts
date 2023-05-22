import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-price-amount/cl-price-amount'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = Props

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/Price/cl-price-amount',
  argTypes: {
    type: {
      description: 'The type of price amount to be displayed.',
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
}

export default meta

export const Basic: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-price code=${codes.available}>
        <cl-price-amount type=${args.type ?? nothing}></cl-price-amount>
      </cl-price>
    `
  )
}
Basic.args = {}
