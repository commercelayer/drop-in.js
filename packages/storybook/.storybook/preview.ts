import { ArgTypes } from '@storybook/html'
import { DecoratorFunction } from '@storybook/addons'
import { defineCustomElements } from '@commercelayer/drop-in/dist/loader'
import { clConfig } from '../stories/assets/constants'

export type Args = {
  'drop-in.css': boolean;
  'minicart.css': boolean;
}

// https://storybook.js.org/docs/react/essentials/controls#annotation
export const argTypes: ArgTypes<Args> = {
  'drop-in.css': {
    description: 'When `true` it loads `drop-in.css`. Components are shipped unstyled, you can import this css or create your own.',
    control: 'boolean',
    table: {
      category: 'global'
    }
  },
  'minicart.css': {
    description: 'When `true` it loads `minicart.css`. This css contains a minimal set to style the minicart.',
    control: 'boolean',
    table: {
      category: 'global',
      disable: true
    }
  }
}

export const args = {
  'drop-in.css': false,
  'minicart.css': false
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
        'drop-in.js',
        'demo',
        'Components', [
          'cl-add-to-cart',
          'Price', [
            'cl-price',
            'cl-price-amount'
          ],
          'Availability', [
            'cl-availability',
            'cl-availability-status',
            'cl-availability-info'
          ],
          'Cart', [
            'introduction',
            'cl-cart-link',
            'cl-cart-count',
            'cl-cart',
            'cl-cart (minicart)',
          ],
          'Checkout', [
            'cl-checkout-link'
          ]
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
      ${ options.args['drop-in.css'] ? '<link href="drop-in.css" rel="stylesheet">' : '' }
      ${ options.args['minicart.css'] ? '<link href="minicart.css" rel="stylesheet">' : '' }
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
