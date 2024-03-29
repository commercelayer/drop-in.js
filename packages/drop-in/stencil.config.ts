import { Config } from '@stencil/core'
import type { JsonDocsComponent, JsonDocsProp } from '@stencil/core/internal'
import { sass } from '@stencil/sass'
import { resolve } from 'path'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

function writeComponents(components: JsonDocsComponent[]): string {
  const writeProp = (prop: JsonDocsProp) => `/** ${prop.docs} */
    ['${prop.attr}']: ${prop.type}`
  const writeComponent = (component: JsonDocsComponent) => `/** ${component.docs} */
  ['${component.tag}'] : {
    ${component.props.map(writeProp).join('\n    ')}
  }`

  return `export type DropInArgs = {
  ${components.map(writeComponent).join('\n  ')}
}
`
}

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
      empty: false,
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
      baseUrl: '/drop-in.js/demo/',
      empty: true,
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'cart.html' },
        { src: '.well-known', dest: '../../.well-known/' }
      ]
    },
    {
      type: 'docs-json',
      file: 'dist/custom-elements.json'
    },
    {
      type: 'custom',
      name: 'types',
      async generator(config, compilerCtx, buildCtx, docs) {
        await compilerCtx.fs.writeFile(
          'dist/custom-elements-args.d.ts',
          writeComponents(docs.components)
        )
      },
    },
    {
      type: 'docs-vscode',
      file: 'dist/vscode-data.json',
    }
  ]
}
