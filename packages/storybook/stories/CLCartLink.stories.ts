import { Meta } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../utils'

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Components/cl-cart-link',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    target: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: { name: 'enum', value: ['_self', '_blank', '_parent', '_top'], required: false },
      control: { type: 'select' }
    }
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = (args) => {
  return create(
    html`
      <cl-cart-link ${args.target ? `target="${args.target}"` : ''}>Cart</cl-cart-link>
    `
  )
};

export const WithSku = Template.bind({})
WithSku.args = {
  target: '_blank'
}

export const WithoutArgs = Template.bind({})
