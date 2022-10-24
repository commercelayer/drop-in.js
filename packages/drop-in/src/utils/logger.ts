import { getConfig } from '#apis/commercelayer/config'

export function log(
  type:
    | 'error'
    | 'info'
    | 'log'
    | 'warn'
    | 'group'
    | 'groupCollapsed'
    | 'groupEnd',
  ...messages: any[]
): void {
  const { debug } = getConfig()

  if (debug === 'all') {
    console[type](...messages)
  }
}
