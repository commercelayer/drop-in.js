import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-identity-status/cl-identity-status'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'

type Args = Props

const meta: Meta<Args> = {
  title: 'Components/Identity/cl-identity-status',
  argTypes: {
    type: {
      description:
        'It determines the visibility of the inner message based on the stored token.',
      type: {
        name: 'enum',
        value: ['guest', 'customer'],
        required: true
      },
      table: {
        category: 'attributes'
      }
    }
  }
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-identity-status type=${args.type ?? nothing}>
        Be our guest 🎶
      </cl-identity-status>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  type: 'guest'
}
