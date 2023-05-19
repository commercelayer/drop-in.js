import { StorybookConfig } from '@storybook/types'

const storybookConfig: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-mdx-gfm'],
  // @ts-expect-error This 'managerEntries' exists.
  managerEntries: [
    require.resolve('./addon-drop-in-css/manager.tsx'),
    require.resolve('./addon-minicart-css/manager.tsx')
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  features: {

  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true // 👈 Disables telemetry
  },
  docs: {
    autodocs: true,
    docsMode: true
  }
}

module.exports = storybookConfig
