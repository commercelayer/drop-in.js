// TODO: update all error messages with a proper link to documentation
export function getConfig() {
  var _a;
  if (!('commercelayerConfig' in window)) {
    throw new Error(`"window.commercelayerConfig" is required.\nLink to doc here.`);
  }
  // @ts-expect-error
  const commercelayerConfig = window.commercelayerConfig;
  if (typeof commercelayerConfig.clientId !== 'string') {
    throw new Error(`"window.commercelayerConfig.clientId" is required.\nLink to doc here.`);
  }
  if (typeof commercelayerConfig.slug !== 'string') {
    throw new Error(`"window.commercelayerConfig.slug" is required.\nLink to doc here.`);
  }
  if (typeof commercelayerConfig.scope !== 'string') {
    throw new Error(`"window.commercelayerConfig.scope" is required.\nLink to doc here.`);
  }
  if (![undefined, 'none', 'all'].includes(commercelayerConfig.debug)) {
    throw new Error(`"window.commercelayerConfig.debug" should one of 'none' (default) or 'all'.\nLink to doc here.`);
  }
  const debug = (_a = commercelayerConfig.debug) !== null && _a !== void 0 ? _a : 'none';
  const endpoint = `https://${commercelayerConfig.slug}.commercelayer.io`;
  return Object.assign(Object.assign({}, commercelayerConfig), { debug,
    endpoint });
}
