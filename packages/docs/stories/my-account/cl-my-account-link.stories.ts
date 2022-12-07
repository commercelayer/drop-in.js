import { Props } from '@commercelayer/drop-in.js/dist/types/components/cl-my-account-link/cl-my-account-link'
import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'

type Args = GlobalArgs & Props & {}

export const meta: Meta<Args> = {
  title: 'Components/My account/cl-my-account-link',
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

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-my-account-link target=${args.target ?? nothing}>
        Go to my account
      </cl-my-account-link>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  'Use drop-in.css': true,
  'Use minicart.css': true,
  target: '_blank'
}
