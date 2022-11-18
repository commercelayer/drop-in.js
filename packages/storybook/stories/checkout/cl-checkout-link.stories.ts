import { Props } from '@commercelayer/drop-in.js/dist/types/components/cl-checkout-link/cl-checkout-link'
import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'

type Args = GlobalArgs & Props & {}

export const meta: Meta<Args> = {
  title: 'Components/Checkout/cl-checkout-link',
  argTypes: {
    target: {
      description:
        'Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).',
      type: {
        name: 'enum',
        value: ['_self', '_blank', '_parent', '_top'],
        required: false
      },
      control: { type: 'select' },
      table: {
        category: 'attributes',
        defaultValue: {
          summary: '_self'
        }
      }
    }
  }
}

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-checkout-link target=${args.target ?? nothing}>
        Checkout
      </cl-checkout-link>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  'drop-in.css': true,
  target: '_blank'
}
