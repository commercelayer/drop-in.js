import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'

type Args = DropInArgs['cl-identity-link']

const meta: Meta<Args> = {
  title: 'Components/Identity/cl-identity-link',
  component: 'cl-identity-link'
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(html`
    <cl-identity-link
      type=${args.type ?? nothing}
      target=${args.target ?? nothing}
    >
      Identity link
    </cl-identity-link>
  `)
}

export const Basic = Template.bind({})
Basic.args = {
  type: 'login',
  target: '_parent'
}

export const WithoutAttributes = Template.bind({})
