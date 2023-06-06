import type { DropInArgs } from '@commercelayer/drop-in.js/dist/custom-elements-args'
import { type Meta, type StoryFn } from '@storybook/html'
import { html, nothing } from 'lit-html'
import { create } from '../../utils'
import { codes } from '../assets/constants'

type Args = DropInArgs['cl-availability']

const meta: Meta<Args> = {
  title: 'Components/Availability/cl-availability',
  component: 'cl-availability'
}

export default meta

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
