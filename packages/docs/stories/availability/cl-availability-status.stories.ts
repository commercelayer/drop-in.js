import { Props } from '@commercelayer/drop-in.js/dist/types/components/cl-availability-status/cl-availability-status'
import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = GlobalArgs &
  Props & {
    ['Use an available product']: boolean
  }

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-status',
  argTypes: {
    'Use an available product': {
      description:
        'Toggle this switch to swap from an out-of-stock to an available product.',
      type: {
        name: 'boolean'
      },
      table: {
        category: 'storybook'
      }
    },
    type: {
      description:
        'The product availability status. It determines the visibility of the inner message.',
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
      <cl-availability
        code=${args['Use an available product']
          ? codes.noDiscount
          : codes.outOfStock}
      >
        <cl-availability-status type=${args.type ?? nothing}>
          • message
        </cl-availability-status>
      </cl-availability>
    `
  )
}
Basic.args = {
  'Use drop-in.css': true,
  'Use an available product': true,
  type: 'available'
}
