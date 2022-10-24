import { getConfig } from '#apis/commercelayer/config';
export function log(type, ...messages) {
  const { debug } = getConfig();
  if (debug === 'all') {
    console[type](...messages);
  }
}
