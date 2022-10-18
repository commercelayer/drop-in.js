import { Meta, StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../../utils'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Args {}

export const meta: Meta<Args> = {
  title: 'Components/Cart/cl-cart'
}

const Template: StoryFn<Args> = () => {
  return create(
    html`
      <cl-cart></cl-cart>
    `
  )
}

export const Basic = Template.bind({})
