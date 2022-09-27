declare global {
  var commercelayerConfig: {
    clientId: string
    endpoint: string
    scope: string
    debug: 'all' | 'none'
  } | undefined
}

export {}