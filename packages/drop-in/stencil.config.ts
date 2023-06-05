import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
import { writeFileSync, rmSync } from 'fs'
import path from 'path'

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
      type: 'docs-json',
      file: 'dist/custom-elements.json'
    },
    {
      type: 'docs-custom',
      generator(docs) {
        const file = path.resolve(__dirname, 'dist', 'custom-elements-args.ts')
        rmSync(file, { force: true })
        setTimeout(() => {
          writeFileSync(file, `
            export type DropInArgs = {
              ${docs.components.map(component => `
                ['${component.tag}'] : {
                  ${component.props.map(prop => `
                    ['${prop.attr}']: ${prop.type}
                `).join('')}
                }
              `).join('')}
            }
          `)
        }, 500)
      },
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
