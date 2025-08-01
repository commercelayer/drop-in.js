// @ts-check

/**
 * This script will replace all "version number" occurrences from jsDelivr urls so that it will point to the latest version.
 * This script runs on "version lifecycle" - https://github.com/lerna/lerna/blob/main/commands/version/README.md#lifecycle-scripts
 * 
 * After every version release, it needded to [purge the jsDelivr cache](https://www.jsdelivr.com/tools/purge) of the following files:
 * - https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.esm.js
 * - https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.css
 * - https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/minicart.css
 * 
 * @example https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.esm.js
 * @example `drop-in.js@2`
 * @example `drop-in.js@2.17.0`
 */

import { replaceInFileSync } from 'replace-in-file'
import lernaJson from './lerna.json' with { type: 'json' }

const [major, minor, patch] = lernaJson.version.split('.')

/** @type { Pick<import('replace-in-file').ReplaceInFileConfig, 'from' | 'to'>[] } */
const tasks = [
  {
    from: /(https:\/\/cdn.jsdelivr.net\/npm\/@commercelayer\/drop-in.js@)([0-9a-z\.\-]+)(\/)/g,
    to: `$1${major}$3`
  },
  {
    from: /`(drop-in.js@)([0-9]+)`/g,
    to: `\`$1${major}\``
  },
  {
    from: /`(drop-in.js@)([0-9]+\.[0-9]+\.[0-9a-z\-]+)`/g,
    to: `\`$1${lernaJson.version}\``
  },
  {
    from: /\"(drop-in.js@)([0-9]+\.[0-9]+\.[0-9a-z\-]+)\"/g,
    to: `\"$1${lernaJson.version}\"`
  },
  {
    from: /({\/\* DO NOT REMOVE - replace version \*\/}v)([0-9a-z\.\-]+)/g,
    to: `$1${lernaJson.version}`
  }
]

try {
  const results = tasks.flatMap(task => replaceInFileSync({
    dry: false,
    ignore: [
      './node_modules/**',
      './**/node_modules/**',

      './packages/drop-in/dist/**',
      './packages/drop-in/www/**',

      './packages/docs/storybook-static/**',
      './packages/docs/public/dist/**',
    ],
    files: [
      './**/*.md*',
      './**/*.ts*',
      './**/*.js*',

      './packages/docs/.storybook/**/*.ts*',
      './packages/docs/.storybook/**/*.js*',
    ],
    ...task
  }))

  const filteredResults = results.filter(r => r.hasChanged).map(r => r.file)
  let uniqueFilteredResults = [...new Set(filteredResults)];

  if (uniqueFilteredResults.length > 0) {
    console.group('Updating "jsDelivr" version:', )
    uniqueFilteredResults.forEach(r => {
      console.info('→', r)
    })
    console.groupEnd()
  }
} catch (error) {
  console.error('Error occurred:', error)
}