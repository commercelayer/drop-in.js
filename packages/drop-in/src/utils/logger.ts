import { Config, getConfig } from '#apis/commercelayer/config'

export const log = (type: 'error' | 'info' | 'log' | 'warn' | 'group' | 'groupEnd', ...message: any) => {

  type Debug = Exclude<Config, undefined>['debug']
  const debug: Debug = getConfig().debug || 'none'

  if (debug === 'all') {
    console[type](...message)
  }
}
