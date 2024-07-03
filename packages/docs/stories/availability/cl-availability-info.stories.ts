import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = DropInArgs['cl-availability-info'] & {
  ['Product availability']: string
}

const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability-info',
  component: 'cl-availability-info',
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
      <cl-availability-status type="available-with-info">
        <cl-availability-info
          type=${args.type ?? nothing}
        ></cl-availability-info>
      </cl-availability-status>
    </cl-availability>
  `)
}
Basic.args = {
  'Product availability': codes.available,
  type: 'min-days'
}

export const Message: StoryFn<Args> = () => {
  return create(
    html`
      <cl-availability code=${codes.available}>
        <cl-availability-status type="available-with-info">
          ready to be shipped in
          <cl-availability-info type="min-days"></cl-availability-info
          // eslint-disable-next-line prettier/prettier
          >-<cl-availability-info type="max-days"></cl-availability-info>
          days with
          <cl-availability-info type="shipping-method-name"></cl-availability-info>
          (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
        </cl-availability-status>
      </cl-availability>
    `
  )
}
