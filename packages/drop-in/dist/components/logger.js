import { g as getConfig } from './config.js';

const log = (type, ...message) => {
  const { debug } = getConfig();
  if (debug === 'all') {
    console[type](...message);
  }
};

export { log as l };
