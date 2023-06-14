import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = DropInArgs['cl-price']

const meta: Meta<Args> = {
  title: 'Components/Price/cl-price',
  component: 'cl-price'
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-price code=${args.code ?? nothing}>
        <cl-price-amount type="compare-at"></cl-price-amount>
        <cl-price-amount type="price"></cl-price-amount>
      </cl-price>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  code: codes.available
}

export const NoDiscount = Template.bind({})
NoDiscount.args = {
  code: codes.noDiscount
}

export const WithoutAttributes = Template.bind({})
