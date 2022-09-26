import { Config } from '@stencil/core'

export const config: Config = {
  namespace: 'drop-in',
  // preamble: 'MIT License\nCopyright (c) 2022 Commerce Layer',

  globalScript: './src/global/app.ts',
  globalStyle: './src/global/app.scss',

  minifyJs: true,
  minifyCss: true,

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],

  testing: {
    browserHeadless: true
  }
}
