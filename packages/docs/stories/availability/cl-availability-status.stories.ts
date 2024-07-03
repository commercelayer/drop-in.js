import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = DropInArgs['cl-availability-status'] & {
  ['Product availability']: string
}

const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-status',
  component: 'cl-availability-status',
  argTypes: {
    'Product availability': {
      description:
        'Select one of the options to swap between products with different availability in the example above.',
      options: [codes.available, codes.digitalProduct, codes.outOfStock],
      control: {
        type: 'select',
        labels: {
          [codes.available]: 'Shippable product',
          [codes.digitalProduct]: 'Digital product',
          [codes.outOfStock]: 'Out of stock product'
        }
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
    <cl-availability code=${args['Product availability']}>
      <cl-availability-status type=${args.type ?? nothing}>
        • message
      </cl-availability-status>
    </cl-availability>
  `)
}
Basic.args = {
  'Product availability': codes.available,
  type: 'available'
}
