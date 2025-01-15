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
      kind=${args.kind ?? nothing}
      code=${args.code ?? nothing}
      quantity=${args.quantity ?? nothing}
      name=${args.name ?? nothing}
      image-url=${args['image-url'] ?? nothing}
      frequency=${args.frequency ?? nothing}
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

export const BundleOutOfStock = Template.bind({})
BundleOutOfStock.args = {
  kind: 'bundle',
  code: codes.bundleOutOfStock
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

export const BundleOversellingPrevention = Template.bind({})
BundleOversellingPrevention.args = {
  kind: 'bundle',
  code: codes.bundleAvailable,
  quantity: 10
}

export const DoNotTrack = Template.bind({})
DoNotTrack.args = {
  code: codes.doNotTrack,
  quantity: 9999
}

export const Subscription = Template.bind({})
Subscription.args = {
  code: codes.subscription,
  frequency: 'three-month'
}
