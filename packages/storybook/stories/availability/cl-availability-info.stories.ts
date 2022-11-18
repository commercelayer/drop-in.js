import { Props } from '@commercelayer/drop-in/dist/types/components/cl-availability-info/cl-availability-info'
import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'
import { skus } from '../assets/constants'

type Args = GlobalArgs &
  Props & {
    ['Use an available SKU']: boolean
  }

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-info',
  argTypes: {
    'Use an available SKU': {
      description:
        'Use the SKU of an available product for demonstration purpose.',
      type: {
        name: 'boolean'
      },
      table: {
        category: 'storybook only'
      }
    },
    type: {
      description: 'Type of data that you wanna show.',
      type: {
        name: 'enum',
        value: [
          'min-days',
          'max-days',
          'min-hours',
          'max-hours',
          'shipping-method-name',
          'shipping-method-price'
        ],
        required: true
      },
      control: { type: 'select' },
      table: {
        category: 'attributes'
      }
    }
  }
}

export const Basic: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-availability
        sku=${args['Use an available SKU'] ? skus.backpack : skus.outOfStock}
      >
        <cl-availability-info
          type=${args.type ?? nothing}
        ></cl-availability-info>
      </cl-availability>
    `
  )
}
Basic.args = {
  'drop-in.css': true,
  'Use an available SKU': true,
  type: 'min-days'
}

export const Message: StoryFn<Args> = () => {
  return create(
    html`
      <cl-availability sku=${skus.backpack}>
        ready to be shipped in
        <cl-availability-info type="min-days"></cl-availability-info
        // eslint-disable-next-line prettier/prettier
        >-<cl-availability-info type="max-days"></cl-availability-info>
        days with
        <cl-availability-info type="shipping-method-name"></cl-availability-info>
        (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
      </cl-availability>
    `
  )
}
