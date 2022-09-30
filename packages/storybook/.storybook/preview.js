import { defineCustomElements } from '@commercelayer/drop-in/loader'

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
  (story) => {
    const tale = story()

    return `
      <script>
        window.commercelayerConfig = {
          clientId: 'xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU',
          slug: 'demo-store-1',
          scope: 'market:10426'
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
