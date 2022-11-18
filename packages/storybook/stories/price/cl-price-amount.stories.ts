import { Props } from '@commercelayer/drop-in/dist/types/components/cl-price-amount/cl-price-amount'
import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = GlobalArgs & Props & {}

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
      <cl-price code=${codes.cap}>
        <cl-price-amount type=${args.type ?? nothing}></cl-price-amount>
      </cl-price>
    `
  )
}
Basic.args = {
  'drop-in.css': true
}
