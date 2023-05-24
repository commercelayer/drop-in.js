import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-cart/cl-cart'
import { type Meta, type StoryFn } from '@storybook/html'
import { html } from 'lit-html'
import { create } from '../../utils'

type Args = Props

const meta: Meta<Args> = {
  title: 'Components/Cart/cl-cart'
}

export default meta

export const Basic: StoryFn<Args> = () => {
  return create(
    html`
      <cl-cart></cl-cart>
    `
  )
}
