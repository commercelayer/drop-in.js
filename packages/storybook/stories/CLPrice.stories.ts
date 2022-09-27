import { Meta } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../utils'

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Components/CLPrice',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    sku: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: { name: 'string', required: false }
    }
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = (args) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  // return createButton({ label, ...args });

  return create(
    html`
      <cl-price sku="${args.sku}">
        The price was: <s><cl-price-compare-at-amount></cl-price-compare-at-amount></s><br />
        Now the price is: <cl-price-amount></cl-price-amount>
      </cl-price>
    `
  )
};

export const WithSku = Template.bind({})
WithSku.args = {
  sku: 'BACKPACK818488000000XXXX'
}

export const WithoutSku = Template.bind({})

