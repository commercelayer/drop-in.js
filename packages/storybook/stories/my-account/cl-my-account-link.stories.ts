import { Props } from '@commercelayer/drop-in/dist/types/components/cl-checkout-link/cl-checkout-link'
import { Meta } from '@storybook/html'
import type { Args as GlobalArgs } from '../../.storybook/preview'

type Args = GlobalArgs & Props & {}

export const meta: Meta<Args> = {
  title: 'Components/My account/cl-my-account-link'
}
