import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'

type Args = DropInArgs['cl-identity-status']

const meta: Meta<Args> = {
  title: 'Components/Identity/cl-identity-status',
  component: 'cl-identity-status'
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
