'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-59aec873.js');
const logger = require('./logger-a98be2b0.js');
const promise = require('./promise-c0988a5f.js');

const _getPrices = async (skus) => {
  const client = await promise.createClient(promise.getConfig());
  const uniqSkus = promise.uniq(skus);
  const log = logger.logGroup('getPrices invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = promise.chunk(uniqSkus, pageSize);
  const pricesResponse = (await Promise.all(chunkedSkus.map(async (skus) => {
    return await client.prices.list({
      pageSize,
      filters: { sku_code_in: skus.join(',') }
    });
  }))).flat();
  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const prices = pricesResponse.reduce((prices, price) => {
    if (price.sku_code !== undefined) {
      prices[price.sku_code] = price;
    }
    return prices;
  }, {});
  log.end();
  return prices;
};
const getPrices = promise.pDebounce(_getPrices, { wait: 50, maxWait: 100 });
const getPrice = promise.memoize(async (sku) => {
  return await getPrices([sku]).then((result) => result[sku]);
});

const CLPrice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  logSku(sku) {
    if (!this.validateSku(sku)) {
      logger.log('warn', '"sku" should be a not string.', this.host);
    }
  }
  validateSku(sku) {
    return typeof sku === 'string' && sku !== '';
  }
  async componentWillLoad() {
    if (this.validateSku(this.sku)) {
      const price = await getPrice(this.sku);
      if (price !== undefined) {
        this.updatePrice(price);
      }
    }
    this.logSku(this.sku);
  }
  watchPropHandler(newValue, _oldValue) {
    this.logSku(newValue);
  }
  updatePrice(price) {
    this.host.querySelectorAll('cl-price-amount').forEach((element) => {
      element.dispatchEvent(new CustomEvent('priceUpdate', { detail: price }));
    });
  }
  render() {
    return index.h("slot", null);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "sku": ["watchPropHandler"]
  }; }
};

exports.cl_price = CLPrice;
