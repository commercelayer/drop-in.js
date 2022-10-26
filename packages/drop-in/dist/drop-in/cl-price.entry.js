import { r as registerInstance, h, g as getElement } from './index-f356444b.js';
import { l as logGroup, a as log } from './logger-3878ee81.js';
import { c as createClient, g as getConfig, u as uniq, a as chunk, p as pDebounce, m as memoize } from './promise-e502bcc3.js';

const _getPrices = async (skus) => {
  const client = await createClient(getConfig());
  const uniqSkus = uniq(skus);
  const log = logGroup('getPrices invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = chunk(uniqSkus, pageSize);
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
const getPrices = pDebounce(_getPrices, { wait: 50, maxWait: 100 });
const getPrice = memoize(async (sku) => {
  return await getPrices([sku]).then((result) => result[sku]);
});

const CLPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  logSku(sku) {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not string.', this.host);
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
    return h("slot", null);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "sku": ["watchPropHandler"]
  }; }
};

export { CLPrice as cl_price };
