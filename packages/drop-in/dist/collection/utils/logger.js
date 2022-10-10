import { getConfig } from '#apis/commercelayer/config';
export const log = (type, ...message) => {
  const { debug } = getConfig();
  if (debug === 'all') {
    console[type](...message);
  }
};
