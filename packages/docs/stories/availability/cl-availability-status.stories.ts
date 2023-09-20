import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = DropInArgs['cl-availability-status'] & {
  ['Use an available product']: boolean
}

const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-status',
  component: 'cl-availability-status',
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
    }
  }
}

export default meta

export const Basic: StoryFn<Args> = (args) => {
  return create(html`
    <cl-availability
      code=${args['Use an available product']
        ? codes.available
        : codes.outOfStock}
    >
      <cl-availability-status type=${args.type ?? nothing}>
        • message
      </cl-availability-status>
    </cl-availability>
  `)
}
Basic.args = {
  'Use an available product': true,
  type: 'available'
}
