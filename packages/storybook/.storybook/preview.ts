import { ArgTypes } from '@storybook/html'
import { DecoratorFunction } from '@storybook/addons'
import { defineCustomElements } from '@commercelayer/drop-in.js/dist/loader'
import { clConfig } from '../stories/assets/constants'

export type Args = {
  'Use drop-in.css': boolean;
  'Use minicart.css': boolean;
}

// https://storybook.js.org/docs/react/essentials/controls#annotation
export const argTypes: ArgTypes<Args> = {
  'Use drop-in.css': {
    description: 'By toggling the switch you can *simulate* how the components will look when importing the `drop-in.css` in your website.',
    control: 'boolean',
    table: {
      category: 'storybook'
    }
  },
  'Use minicart.css': {
    description: 'By toggling the switch you can *simulate* how the components will look when importing the `minicart.css` in your website.',
    control: 'boolean',
    table: {
      category: 'storybook',
      disable: true
    }
  }
}

export const args = {
  'Use drop-in.css': false,
  'Use minicart.css': false
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  // viewMode: 'docs',
  // previewTabs: {
  //   canvas: {
  //     disable: true,
  //     hidden: false
  //   }
  // },
  options: {
    storySort: {
      order: [
        'introduction',
        'demo',
        'getting started',
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
          ],
          'My account', [
            'cl-my-account-link'
          ],
        ]
      ]
    },
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const storyAsHTML = (story: unknown) => {
  const wrapper = document.createElement('div')
  if (story instanceof HTMLElement) {
    wrapper.appendChild(story)
  }
  return wrapper.innerHTML
};

export const decorators: DecoratorFunction[] = [
  (story, options) => {
    const tale = story()

    return `
      ${ options.args['Use drop-in.css'] ? '<link href="drop-in.css" rel="stylesheet">' : '' }
      ${ options.args['Use minicart.css'] ? '<link href="minicart.css" rel="stylesheet">' : '' }
      ${ typeof tale === 'string' ? tale : storyAsHTML(tale) }
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
