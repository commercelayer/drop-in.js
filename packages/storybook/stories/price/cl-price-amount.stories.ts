import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { skus } from '../assets/constants'

interface Args {
  type?: 'price' | 'compare-at'
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Price/cl-price-amount',
  argTypes: {
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
}

export const Basic: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-price sku=${skus.bag}>
        <cl-price-amount type=${args.type ?? nothing}></cl-price-amount>
      </cl-price>
    `
  )
}
