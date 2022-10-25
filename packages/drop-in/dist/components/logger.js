import { g as getConfig } from './promise.js';

/**
 * Outputs a message to the Web console.
 * @param type Type of message.
 * @param messages List of messages.
 */
const log = (type, ...messages) => {
  const { debug } = getConfig();
  if (debug === 'all') {
    console[type](...messages);
  }
};
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
function logGroup(label, collapsed = true) {
  const logs = [];
  const end = () => {
    log(collapsed ? 'groupCollapsed' : 'group', label);
    logs.forEach((messages) => {
      log(...messages);
    });
    log('groupEnd');
  };
  const _log = (type, ...messages) => {
    logs.push([type, ...messages]);
  };
  _log.end = end;
  return _log;
}

export { log as a, logGroup as l };
