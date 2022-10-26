import { ArgTypes } from '@storybook/html'
import { DecoratorFunction } from '@storybook/addons'
import { defineCustomElements } from '@commercelayer/drop-in/dist/loader'

type Args = {
  styles: Boolean;
}

// https://storybook.js.org/docs/react/essentials/controls#annotation
export const argTypes: ArgTypes<Args> = {
  styles: {
    description: 'When `true` it loads drop-in.css. Components are shipped unstyled, you can import this css or create your own.',
    control: 'boolean',
    table: {
      category: 'global'
    }
  }
}

export const args = { styles: false };

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
        'Components', [
          'cl-add-to-cart',
          'Price', [
            'cl-price',
            'cl-price-amount'
          ],
          'Cart', [
            'introduction',
            'cl-cart-link',
            'cl-cart-count',
            'cl-cart'
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
  (story) => {
    const tale = story()

    return `
      <style>
        body {
          font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif
        }
      </style>
      ${ typeof tale === 'string' ? tale : storyAsHTML(tale) }
    `
  },
  (story, options) => {
    const tale = story()

    return `
      ${ options.args.styles ? '<link href="drop-in.css" rel="stylesheet">' : '' }
      ${ typeof tale === 'string' ? tale : storyAsHTML(tale) }
    `
  },
  (story) => {
    // @ts-expect-error
    window.commercelayerConfig = {
      clientId: 'kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8',
      slug: 'drop-in-js',
      scope: 'market:11709',
      debug: 'all'
    }

    return story()
  },
  (story) => {
    defineCustomElements()
    return story()
  },
]
