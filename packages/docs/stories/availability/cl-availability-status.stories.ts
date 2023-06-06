import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-availability-status/cl-availability-status'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = Props & {
  ['Use an available product']: boolean
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-status',
  argTypes: {
    'Use an available product': {
      description:
        'Toggle this switch to swap from an out-of-stock to an available product in the example above.',
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
      control: { type: 'select' }
    }
  }
}

export default meta

export const Basic: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-availability
        code=${args['Use an available product']
          ? codes.available
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
  'Use an available product': true,
  type: 'available'
}
