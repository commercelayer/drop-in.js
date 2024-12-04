Object.defineProperty(window, 'postMessage', {
  // @ts-expect-error
  value: jest.fn()
})

Object.defineProperty(window, 'parent', {
  value: Object.create(window)
})

Object.defineProperty(window, 'location', {
  value: {
    href: 'http://example.com'
  }
})

Object.defineProperty(window, 'commercelayerConfig', {
  configurable: true,
  value: {
    clientId: 'kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8',
    scope: 'market:code:usa'
  }
})
