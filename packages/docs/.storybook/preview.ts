import { HtmlRenderer } from '@storybook/html'
import { BaseAnnotations } from '@storybook/types'
import { defineCustomElements } from '@commercelayer/drop-in.js/dist/loader'
import { clConfig } from '../stories/assets/constants'

export type Args = {
  'Use drop-in.css': boolean;
  'Use minicart.css': boolean;
}

const preview: BaseAnnotations<HtmlRenderer, Args> = {
  args: {
    'Use drop-in.css': false,
    'Use minicart.css': false
  },
  argTypes: {
    'Use drop-in.css': {
      description: 'Toggle this switch to *simulate* in this page how the components would look when importing the `drop-in.css` into your website.',
      control: 'boolean',
      table: {
        category: 'storybook'
      }
    },
    'Use minicart.css': {
      description: 'Toggle this switch to *simulate* in this page how the components would look when importing the `minicart.css` into your website.',
      control: 'boolean',
      table: {
        category: 'storybook',
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Getting started',
          'Components', [
            'Price', [
              'cl-price',
              'cl-price-amount'
            ],
            'Availability', [
              'cl-availability',
              'cl-availability-status',
              'cl-availability-info'
            ],
            'Add to cart', [
              'cl-add-to-cart'
            ],
            'Cart', [
              'cl-cart',
              'cl-cart-link',
              'cl-cart-count',
            ],
            'Checkout', [
              'cl-checkout-link'
            ]
          ]
        ]
      },
    }
  },
  decorators: [
    (story, options) => {
      const tale = story()

      return `
      ${options.args['Use drop-in.css'] ? '<link href="drop-in.css" rel="stylesheet">' : ''}
      ${options.args['Use minicart.css'] ? '<link href="minicart.css" rel="stylesheet">' : ''}
      ${typeof tale === 'string' ? tale : storyAsHTML(tale)}
    `
    },
    (story) => {
      // @ts-expect-error
      window.commercelayerConfig = {
        clientId: clConfig.clientId,
        slug: clConfig.slug,
        scope: clConfig.scope,
        debug: clConfig.debug
      }

      return story()
    },
    (story) => {
      defineCustomElements()
      return story()
    },
  ]
};

const storyAsHTML = (story: unknown) => {
  const wrapper = document.createElement('div')
  if (story instanceof HTMLElement) {
    wrapper.appendChild(story)
  }
  return wrapper.innerHTML
};

export default preview
