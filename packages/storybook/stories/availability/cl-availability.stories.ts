import { Props } from '@commercelayer/drop-in.js/dist/types/components/cl-availability/cl-availability'
import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import type { Args as GlobalArgs } from '../../.storybook/preview'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = GlobalArgs & Props & {}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    code: {
      description: 'SKU is a unique identifier, meaning Stock Keeping Unit.',
      type: { name: 'string', required: true },
      table: {
        category: 'attributes'
      }
    }
  }
}

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
  'drop-in.css': true,
  code: codes.backpack
}

export const WithoutAttributes = Template.bind({})
