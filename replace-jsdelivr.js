// @ts-check

/**
 * This script will replace all "version number" occurrences from jsDelivr urls so that it will point to the latest version.
 * This script runs on "version lifecycle" - https://github.com/lerna/lerna/blob/main/commands/version/README.md#lifecycle-scripts
 * 
 * @example https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.esm.js
 * @example `drop-in.js@2`
 * @example `drop-in.js@2.4.3`
 */

const { sync } = require('replace-in-file')
const { version } = require('./lerna.json')

const [major, minor, patch] = version.split('.')

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
    to: `\`$1${version}\``
  },
  {
    from: /({\/\* DO NOT REMOVE - replace version \*\/}v)([0-9a-z\.\-]+)/g,
    to: `$1${version}`
  }
]

try {
  const results = tasks.flatMap(task => sync({
    dry: false,
    ignore: [
      './node_modules/**',
      './**/node_modules/**',
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