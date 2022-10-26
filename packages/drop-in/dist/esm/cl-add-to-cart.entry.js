import { r as registerInstance, h, e as Host, g as getElement } from './index-f356444b.js';
import { a as addItem } from './cart-39ffce27.js';
import { l as logGroup, a as log } from './logger-3878ee81.js';
import { c as createClient, g as getConfig, u as uniq, a as chunk, p as pDebounce, m as memoize } from './promise-e502bcc3.js';

const _getSkuIds = async (skus) => {
  const client = await createClient(getConfig());
  const uniqSkus = uniq(skus);
  const log = logGroup('getSkuIds invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = chunk(uniqSkus, pageSize);
  const idsResponse = (await Promise.all(chunkedSkus.map(async (skus) => {
    return await client.skus.list({
      pageSize,
      filters: { sku_code_in: skus.join(',') },
      fields: ['id', 'code']
    });
  }))).flat();
  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const ids = idsResponse.reduce((ids, sku) => {
    if (sku.id !== undefined && sku.code !== undefined) {
      ids[sku.code] = sku.id;
    }
    return ids;
  }, {});
  log.end();
  return ids;
};
const getSkuIds = pDebounce(_getSkuIds, { wait: 50, maxWait: 100 });
const getSkuId = memoize(async (sku) => {
  return await getSkuIds([sku]).then((result) => result[sku]);
});
const getSku = memoize(async (sku) => {
  const id = await getSkuId(sku);
  if (id === undefined) {
    return undefined;
  }
  const client = await createClient(getConfig());
  return await client.skus.retrieve(id);
});

const CLAddToCart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Quantity
     */
    this.quantity = 1;
  }
  logSku(sku) {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not empty string.', this.host);
    }
  }
  logQuantity(quantity) {
    if (!this.validateQuantity(quantity)) {
      log('warn', '"quantity" should be a number equal or greater than 0.', this.host);
    }
  }
  validateSku(sku) {
    return typeof sku === 'string' && sku !== '';
  }
  validateQuantity(quantity) {
    return quantity >= 0;
  }
  watchSkuHandler(newValue, _oldValue) {
    this.logSku(newValue);
  }
  watchQuantityHandler(newValue, _oldValue) {
    if (!this.validateQuantity(newValue)) {
      this.quantity = 0;
    }
  }
  async componentWillLoad() {
    if (this.validateSku(this.sku)) {
      this.skuObject = await getSku(this.sku);
      if (this.skuObject === undefined) {
        log('warn', `Cannot find sku ${this.sku}.`, this.host);
      }
    }
    this.logSku(this.sku);
    this.logQuantity(this.quantity);
  }
  handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleAddItem();
    }
  }
  handleAddItem() {
    if (this.sku !== undefined && this.canBeSold()) {
      addItem(this.sku, this.quantity).catch((error) => {
        throw error;
      });
    }
  }
  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold() {
    var _a, _b;
    // TODO: check for stock
    return (this.validateSku(this.sku) &&
      this.quantity > 0 &&
      // @ts-expect-error
      ((_b = (_a = this.skuObject) === null || _a === void 0 ? void 0 : _a.inventory) === null || _b === void 0 ? void 0 : _b.available) === true);
  }
  render() {
    const enabled = this.canBeSold();
    return (h(Host, { role: 'button', tabindex: '0', "aria-disabled": enabled ? undefined : 'true', onKeyPress: (event) => this.handleKeyPress(event), onClick: () => this.handleAddItem() }, h("slot", null)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "sku": ["watchSkuHandler"],
    "quantity": ["watchQuantityHandler"]
  }; }
};

export { CLAddToCart as cl_add_to_cart };
