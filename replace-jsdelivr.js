// @ts-check

/**
 * This script will replace all "version number" occurrences from jsDelivr urls so that it will point to the latest version.
 * This script runs on "version lifecycle" - https://github.com/lerna/lerna/blob/main/commands/version/README.md#lifecycle-scripts
 * 
 * @example https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@1.1.0/dist/drop-in/drop-in.esm.js
 */

const { sync } = require('replace-in-file')
const { version } = require('./lerna.json')

const options = {
  dry: false,
  files: [
    './**/*.md*',
    './**/*.ts*',
    './**/*.js*'
  ],
  from: /(https:\/\/cdn.jsdelivr.net\/npm\/@commercelayer\/drop-in.js@)([0-9a-z\.\-]+)(\/)/g,
  to: `$1${version}$3`
}

try {
  const results = sync(options)
  const filteredResults = results.filter(r => r.hasChanged).map(r => r.file)

  if (filteredResults.length > 0) {
    console.group('Updating "jsDelivr" version:', )
    filteredResults.forEach(r => {
      console.info('→', r)
    })
    console.groupEnd()
  }
} catch (error) {
  console.error('Error occurred:', error)
}