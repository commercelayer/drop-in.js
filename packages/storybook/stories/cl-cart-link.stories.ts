import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../utils'

interface Args {
  target: '_self' | '_blank' | '_parent' | '_top' | undefined
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/cl-cart-link',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    target: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: {
        name: 'enum',
        value: ['_self', '_blank', '_parent', '_top'],
        required: false
      },
      control: { type: 'select' }
    }
  }
}

export default meta

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-cart-link target=${args.target ?? nothing}>Cart</cl-cart-link>
    `
  )
}

export const WithSku = Template.bind({})
WithSku.args = {
  target: '_blank'
}

export const WithoutArgs = Template.bind({})
