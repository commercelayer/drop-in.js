import { defineCustomElements } from '@commercelayer/drop-in/loader'
import { html } from 'lit-html'
import { create } from '../utils'

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Example/MyComponent',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    first: { control: 'text' },
    middle: { control: 'text' },
    last: { control: 'text' }
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
      <my-component first="${args.first}" middle="${args.middle}" last="${args.last}"></my-component>
    `
  )
};

export const Example = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Example.args = {
  first: 'Stencil',
  last: `'Don't call me a framework' JS`
};
