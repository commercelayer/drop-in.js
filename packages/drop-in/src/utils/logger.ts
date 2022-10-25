import { getConfig } from '#apis/commercelayer/config'

type LogType =
  | 'error'
  | 'info'
  | 'log'
  | 'warn'
  | 'group'
  | 'groupCollapsed'
  | 'groupEnd'

/**
 * Outputs a message to the Web console.
 * @param type Type of message.
 * @param messages List of messages.
 */
export const log: Log = (type, ...messages) => {
  const { debug } = getConfig()

  if (debug === 'all') {
    console[type](...messages)
  }
}

/**
 * The `logGroup()` method creates a new inline group in the Web console log,
 * causing any subsequent console messages to be indented by an additional level,
 * until `log.end()` is called.
 * @param label Label for the group.
 * @param collapsed The new block is collapsed and requires clicking a disclosure button to read it.
 * @returns Returns a function that can be invoked to collect logs. To display collected log you should call `.end()` method.
 * @example
 * const log = logGroup('Label for the group', false)
 * log('info', 'Message for the group')
 * log('warn', 'Field should not be empty')
 * log.end()
 */
export function logGroup(
  label: string,
  collapsed: boolean = true
): {
  /**
   * Collect a message.
   * @param type Type of message.
   * @param messages List of messages.
   */
  (type: LogType, ...messages: any[]): void

  /**
   * Outputs collected messages to the Web console.
   */
  end: () => void
} {
  const logs: Logs[] = []

  const end = (): void => {
    log(collapsed ? 'groupCollapsed' : 'group', label)
    logs.forEach((messages) => {
      log(...messages)
    })
    log('groupEnd')
  }

  const _log = (type: LogType, ...messages: any[]): void => {
    logs.push([type, ...messages])
  }

  _log.end = end

  return _log
}

type Logs = [LogType, ...any]

/**
 * Outputs a message to the Web console.
 * @param type Type of message.
 * @param messages List of messages.
 */
type Log = (type: LogType, ...messages: any[]) => void
