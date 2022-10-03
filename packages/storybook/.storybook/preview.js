import { defineCustomElements } from '@commercelayer/drop-in/dist/loader'

// https://storybook.js.org/docs/react/essentials/controls#annotation
export const argTypes = { styles: { control: 'boolean' } }

export const args = { styles: false };

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const storyAsHTML = (story) => {
  const wrapper = document.createElement('div')
  wrapper.appendChild(story)
  return wrapper.innerHTML
};

export const decorators = [
  (story, options) => {
    const tale = story()

    return `
      ${ options.args.styles ? '<link href="/drop-in.css" rel="stylesheet">' : '' }
      ${ typeof tale === 'string' ? tale : storyAsHTML(tale) }
    `
  },
  (story) => {
    const tale = story()

    return `
      <script>
        window.commercelayerConfig = {
          clientId: 'xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU',
          slug: 'demo-store-1',
          scope: 'market:10426',
          debug: 'all'
        }
      </script>
      ${ typeof tale === 'string' ? tale : storyAsHTML(tale) }
    `
  },
  (story) => {
    defineCustomElements()
    return story()
  },
]
