// @ts-check

/** @type import('@storybook/types').CoreConfig */
module.exports = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  features: {
    postcss: false
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true // 👈 Disables telemetry
  },
  docs: {
    autodocs: true
  }
};