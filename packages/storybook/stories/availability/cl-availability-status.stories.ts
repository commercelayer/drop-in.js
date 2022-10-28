import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { skus } from '../assets/constants'

interface Args {
  available: boolean
  type?: 'available' | 'unavailable'
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-status',
  argTypes: {
    available: {
      description: 'Use the SKU of an available product.',
      type: {
        name: 'boolean'
      },
      table: {
        category: 'global'
      }
    },
    type: {
      description:
        'The inner message will be displayed based on the status type. If the type is set to "available", the inner message will be visible only if the product is available.',
      type: {
        name: 'enum',
        value: ['available', 'unavailable'],
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
      <cl-availability sku=${args.available ? skus.bag : skus.outOfStock}>
        <cl-availability-status type=${args.type ?? nothing}>
          • message
        </cl-availability-status>
      </cl-availability>
    `
  )
}
Basic.args = {
  available: true,
  type: 'available'
}
