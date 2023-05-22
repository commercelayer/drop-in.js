import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-checkout-link/cl-checkout-link'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'

type Args = Props

const meta: Meta<Args> = {
  title: 'Components/Checkout/cl-checkout-link',
  argTypes: {
    target: {
      description:
        'The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).',
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

export default meta

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-checkout-link target=${args.target ?? nothing}>
        Proceed to checkout
      </cl-checkout-link>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  target: '_blank'
}
