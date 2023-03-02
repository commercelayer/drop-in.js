// @ts-check

/** @type import('@storybook/core-common').StorybookConfig */
module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/html',
  features: {
    postcss: false
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  }
}
