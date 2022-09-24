import { defineCustomElements } from '@commercelayer/drop-in.js/loader'
import { html } from 'lit-html'
import { create } from '../utils'

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Example/CLPrice',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    sku: { control: 'text' }
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = (args) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  // return createButton({ label, ...args });

  defineCustomElements()

  return create(
    html`
      <div>
        <script>
          window.commercelayerConfig = {
            clientId: 'xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU',
            endpoint: 'https://demo-store-1.commercelayer.io',
            scope: 'market:10426'
          }
          </script>
        <cl-price sku="${args.sku}" />
        <cl-price sku="${args.sku}" />
      </div>
    `
  )
};

export const Example = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Example.args = {
  sku: 'BACKPACK818488000000XXXX'
};
