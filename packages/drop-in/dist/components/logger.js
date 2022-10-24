import { g as getConfig } from './promise.js';

function log(type, ...messages) {
  const { debug } = getConfig();
  if (debug === 'all') {
    console[type](...messages);
  }
}

export { log as l };
