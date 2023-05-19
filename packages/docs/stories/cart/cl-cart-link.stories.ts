import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-cart-link/cl-cart-link'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
// import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'

type Args = GlobalArgs &
  Props & {
    text: string | undefined
  }

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/Cart/cl-cart-link',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
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
    },
    text: {
      description: 'Markup contained within the element.',
      type: {
        name: 'string',
        required: false
      },
      control: { type: 'text' },
      table: {
        disable: true,
        category: 'attributes'
      }
    }
  }
}

export default meta

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-cart-link target=${args.target ?? nothing}>
        asd
      </cl-cart-link>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  'Use drop-in.css': true,
  target: '_blank',
  text: 'View cart'
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  target: '_blank',
  text: `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 23H8.725L5.2375 3.825C5.1967 3.59537 5.07691 3.38722 4.89887 3.23657C4.72082 3.08592 4.49572 3.00223 4.2625 3H2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 28C11.3807 28 12.5 26.8807 12.5 25.5C12.5 24.1193 11.3807 23 10 23C8.61929 23 7.5 24.1193 7.5 25.5C7.5 26.8807 8.61929 28 10 28Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M23 28C24.3807 28 25.5 26.8807 25.5 25.5C25.5 24.1193 24.3807 23 23 23C21.6193 23 20.5 24.1193 20.5 25.5C20.5 26.8807 21.6193 28 23 28Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.8125 18H23.5125C23.98 18.0014 24.433 17.838 24.7919 17.5386C25.1508 17.2391 25.3927 16.8227 25.475 16.3625L27 8H6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
}
