import { Meta, StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { skus } from '../assets/constants'

interface Args {
  sku?: string
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    sku: {
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
      <cl-availability sku=${args.sku ?? nothing}>
        <cl-availability-status type="available">
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          • out of stock
        </cl-availability-status>
      </cl-availability>
    `
  )
}

export const Basic = Template.bind({})
Basic.args = {
  sku: skus.bag
}

export const WithoutAttributes = Template.bind({})
