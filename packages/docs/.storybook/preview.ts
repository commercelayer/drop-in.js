import { defineCustomElements } from '@commercelayer/drop-in.js/dist/loader'
import { Preview } from '@storybook/html'
import { clConfig } from '../stories/assets/constants'
import { FILENAME as DROP_IN_CSS_FILENAME, PARAM_KEY as DROP_IN_CSS_PARAM_KEY } from './addon-drop-in-css/constants'
import { FILENAME as MINICART_CSS_FILENAME, PARAM_KEY as MINICART_CSS_PARAM_KEY } from './addon-minicart-css/constants'

import customElements, { JsonDocsProp } from '@commercelayer/drop-in.js/dist/custom-elements'

console.log('customElements', customElements)

export const globals = {
  [DROP_IN_CSS_PARAM_KEY]: true,
  [MINICART_CSS_PARAM_KEY]: true,
}

const preview: Preview = {
  argTypesEnhancers: [
    // Add StencilJS custom-elements manifest
    (context) => {
      const customElement = customElements.components.find(c => c.tag === context.component)

      function getType(prop: JsonDocsProp) {
        const values = prop.values.filter(v => v.type !== 'undefined')
        if (values.length > 1 || values[0].value != null) {
          return {
            name: 'enum',
            value: values.map(v => v.value),
            required: prop.required
          }
        }

        return {
          name: values[0].type,
          required: prop.required
        }
      }

      const argTypes = customElement?.props.map(prop => {
        const type = getType(prop)
        return [
          prop.attr,
          {
            name: prop.attr,
            description: prop.docs,
            type,
            control: {
              type: type.name === 'enum' ? 'select' : undefined
            },
            table: {
              ...('default' in prop ? {
                defaultValue: {
                  summary: prop.default
                }
              } : {})
            }
          }
        ]
      })

      return {
        ...context.argTypes,
        ...(argTypes != null ? Object.fromEntries(argTypes) : {})
      }
    },
    // Add default category
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
    ),
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
