import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { skus } from '../assets/constants'

interface Args {
  available: boolean
  format?: 'days' | 'hours'
  message?: string
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-message',
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
    format: {
      description: 'Time format.',
      type: {
        name: 'enum',
        value: ['days', 'hours'],
        required: true
      },
      control: { type: 'select' },
      table: {
        category: 'attributes'
      }
    },
    message: {
      description:
        'Availability message. This message can contain a `{min}` placeholder and a `{max}` placeholder.',
      type: {
        name: 'string',
        required: true
      },
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
        <cl-availability-message
          format=${args.format ?? nothing}
          message=${args.message ?? nothing}
        ></cl-availability-message>
      </cl-availability>
    `
  )
}
Basic.args = {
  available: true,
  message: 'ready to be shipped in {min}-{max}'
}
