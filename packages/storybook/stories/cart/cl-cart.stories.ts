import { Meta, StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'

type Args = GlobalArgs & {}

export const meta: Meta<Args> = {
  title: 'Components/Cart/cl-cart'
}

export const Basic: StoryFn<Args> = () => {
  return create(
    html`
      <cl-cart></cl-cart>
    `
  )
}
