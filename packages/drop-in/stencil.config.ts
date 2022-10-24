import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export const config: Config = {
  namespace: 'drop-in',
  // preamble: 'MIT License\nCopyright (c) 2022 Commerce Layer',

  globalStyle: './src/global/app.scss',

  buildEs5: false,

  minifyJs: true,
  minifyCss: true,

  plugins: [
    sass()
  ],

  outputTargets: [
    {
      type: 'dist',
      // esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      includeGlobalScripts: false
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ],

  testing: {
    browserHeadless: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
    }
  }
}
