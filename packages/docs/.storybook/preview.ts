import { Preview } from '@storybook/html'
import { defineCustomElements } from '@commercelayer/drop-in.js/dist/loader'
import { clConfig } from '../stories/assets/constants'
import { PARAM_KEY as DROP_IN_CSS_PARAM_KEY, FILENAME as DROP_IN_CSS_FILENAME } from './addon-drop-in-css/constants'
import { PARAM_KEY as MINICART_CSS_PARAM_KEY, FILENAME as MINICART_CSS_FILENAME } from './addon-minicart-css/constants'

export const globals = {
  [DROP_IN_CSS_PARAM_KEY]: true,
  [MINICART_CSS_PARAM_KEY]: true,
}

const preview: Preview = {
  argTypesEnhancers: [
    (context) => Object.fromEntries(
      Object.entries(context.argTypes).map(([name, value]) => [
        name,
        {
          ...value,
          table: {
            ...value.table ?? {},
            category: value.table?.category ?? 'attributes'
          }
        }
      ])
    )
  ],
  parameters: {
    docs: {
      canvas: { sourceState: 'shown' },
    },
    backgrounds: {
      disable: true,
      grid: { disable: true }
    },
    options: {
      table: {
        category: 'asd'
      },
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
              'cl-cart (minicart)',
              'cl-cart-count',
            ],
            'Checkout', [
              'cl-checkout-link'
            ],
            'Identity', [
              'cl-identity-link',
              'cl-identity-status',
              'cl-my-account-link',
            ]
          ]
        ]
      },
    }
  },
  decorators: [
    (story, context) => {
      const dropInCssEnabled = context.globals[DROP_IN_CSS_PARAM_KEY]
      const minicartCssEnabled = context.globals[MINICART_CSS_PARAM_KEY]

      if (dropInCssEnabled) {
        const link = document.createElement('link')
        link.href = DROP_IN_CSS_FILENAME
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      } else {
        const links = document.querySelectorAll(`[href="${DROP_IN_CSS_FILENAME}"]`)
        links.forEach(link => link.remove())
      }

      if (minicartCssEnabled) {
        const link = document.createElement('link')
        link.href = MINICART_CSS_FILENAME
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      } else {
        const links = document.querySelectorAll(`[href="${MINICART_CSS_FILENAME}"]`)
        links.forEach(link => link.remove())
      }

      return story()
    },
    (story) => {
      // @ts-expect-error
      window.commercelayerConfig = {
        ...clConfig
      }

      return story()
    },
    (story) => {
      defineCustomElements()
      return story()
    },

    // TODO: temporary fix for - https://github.com/storybookjs/storybook/issues/22645
    (story) => {
      const tale = story()
      return `
        <div class="hidden">${Math.random()}</div>
        ${typeof tale === 'string' ? tale : story()}
      `
    },
  ]
};

export default preview
