module.exports = {
  reject: [
    'pnpm',
    'iframe-resizer',
    '@types/iframe-resizer'
  ],
  filterResults: (name, { upgradedVersionSemver }) => {
    if (
      name === '@types/node' && parseInt(upgradedVersionSemver?.major) >= 24
    ) {
      return false
    }

    return true
  }
}
