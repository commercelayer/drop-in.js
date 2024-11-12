import { StorybookConfig } from '@storybook/types'
import remarkGfm from 'remark-gfm'

const storybookConfig: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-swc'
  ],
  // @ts-expect-error This 'managerEntries' exists.
  managerEntries: [
    require.resolve('./addon-drop-in-css/manager.tsx'),
    require.resolve('./addon-minicart-css/manager.tsx'),
    require.resolve('./addon-scope-selector/manager.tsx'),
    require.resolve('./addon-version/manager.tsx'),
    require.resolve('./addon-gh-repository/manager.tsx'),
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
    docsMode: true
  }
}

module.exports = storybookConfig
