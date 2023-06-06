import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-identity-link/cl-identity-link'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'

type Args = Props

const meta: Meta<Args> = {
  title: 'Components/Identity/cl-identity-link',
  argTypes: {
    type: {
      description: '',
      type: {
        name: 'enum',
        value: ['login', 'sign-up', 'logout'],
        required: true
      }
    },
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
        defaultValue: {
          summary: '_self'
        }
      }
    }
  }
}

export default meta

const Template: StoryFn<Args> = (args) => {
  return create(
    html`
      <cl-identity-link
        type=${args.type ?? nothing}
        target=${args.target ?? nothing}
      >
        Identity link
      </cl-identity-link>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  type: 'login',
  target: '_parent'
}

export const WithoutAttributes = Template.bind({})
