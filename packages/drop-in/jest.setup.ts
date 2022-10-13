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
    clientId: 'xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU',
    slug: 'demo-store-1',
    scope: 'market:10426'
  }
})
