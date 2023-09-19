import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = DropInArgs['cl-add-to-cart']

const meta: Meta<Args> = {
  title: 'Components/Add to cart/cl-add-to-cart',
  component: 'cl-add-to-cart'
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(html`
    <cl-add-to-cart
      code=${args.code ?? nothing}
      quantity=${args.quantity ?? nothing}
    >
      Add to cart
    </cl-add-to-cart>
  `)
}

export const Basic = Template.bind({})
Basic.args = {
  code: codes.available
}

export const WithoutAttributes = Template.bind({})

export const OutOfStock = Template.bind({})
OutOfStock.args = {
  code: codes.outOfStock
}

export const Nonexisting = Template.bind({})
Nonexisting.args = {
  code: codes.nonexisting
}

export const OversellingPrevention = Template.bind({})
OversellingPrevention.args = {
  code: codes.noOverselling,
  quantity: 100
}

export const DoNotTrack = Template.bind({})
DoNotTrack.args = {
  code: codes.doNotTrack,
  quantity: 9999
}
