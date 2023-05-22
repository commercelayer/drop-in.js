import { type Props } from '@commercelayer/drop-in.js/dist/types/components/cl-availability/cl-availability'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = Props

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    code: {
      description: `The SKU code (i.e. the unique identifier of the product whose availability you want to display). The pre-filled code refers to an available product, try to change it with an out-of-stock (e.g. <code>${codes.outOfStock}</code>) and see how the component behaves in the example above.`,
      type: { name: 'string', required: true },
      table: {
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
      <cl-availability code=${args.code ?? nothing}>
        <cl-availability-status type="available">
          <span style="color: green;">• available</span>
          ready to be shipped in
          <cl-availability-info type="min-days"></cl-availability-info
          // eslint-disable-next-line prettier/prettier
          >-<cl-availability-info type="max-days"></cl-availability-info>
          days
        </cl-availability-status>
        <cl-availability-status type="unavailable" style="color: red;">
          • out of stock
        </cl-availability-status>
      </cl-availability>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  code: codes.available
}

export const WithoutAttributes = Template.bind({})
