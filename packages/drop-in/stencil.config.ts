import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export const config: Config = {
  namespace: 'drop-in',
  // preamble: 'MIT License\nCopyright (c) 2022 Commerce Layer',

  globalStyle: './src/global/drop-in.scss',

  buildEs5: false,

  minifyJs: true,
  minifyCss: true,

  sourceMap: false,

  plugins: [
    sass()
  ],

  hydratedFlag: {
    selector: 'attribute',
    name: 'cl-hydrated'
  },

  outputTargets: [
    {
      type: 'dist',
      // esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      includeGlobalScripts: false,
      customElementsExportBehavior: 'auto-define-custom-elements'
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'cart.html' }
      ]
    }
  ],

  testing: {
    browserHeadless: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

      // TODO: remove this when updating to Jest v29. (waiting for Stencil)
      // https://github.com/axios/axios/issues/5026#issuecomment-1288528794
      '^axios$': require.resolve('axios')
    }
  }
}
