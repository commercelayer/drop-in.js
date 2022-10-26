Object.defineProperty(window, 'postMessage', {
  // @ts-expect-error
  value: jest.fn()
})

Object.defineProperty(window, 'parent', {
  value: Object.create(window)
})

Object.defineProperty(window, 'commercelayerConfig', {
  configurable: true,
  value: {
    clientId: 'kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8',
    slug: 'drop-in-js',
    scope: 'market:11709'
  }
})
