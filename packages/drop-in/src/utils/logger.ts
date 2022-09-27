export const log = (type: 'error' | 'info' | 'log' | 'warn', ...message: any) => {

  type Debug = Exclude<typeof commercelayerConfig, undefined>['debug']
  const debug: Debug = window.commercelayerConfig?.debug || 'none'

  if (debug === 'all') {
    console[type](...message)
  }
}
