import { getConfig } from '#apis/commercelayer/config'

export const log = (type: 'error' | 'info' | 'log' | 'warn' | 'group' | 'groupEnd', ...message: any) => {
  const { debug } = getConfig()

  if (debug === 'all') {
    console[type](...message)
  }
}
