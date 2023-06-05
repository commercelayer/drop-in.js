import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'

type Args = DropInArgs['cl-my-account-link']

const meta: Meta<Args> = {
  title: 'Components/Identity/cl-my-account-link',
  component: 'cl-my-account-link'
}

export default meta

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
  target: '_blank'
}
