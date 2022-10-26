'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-59aec873.js');
const cart = require('./cart-049301c5.js');
const logger = require('./logger-a98be2b0.js');
const promise = require('./promise-c0988a5f.js');

const _getSkuIds = async (skus) => {
  const client = await promise.createClient(promise.getConfig());
  const uniqSkus = promise.uniq(skus);
  const log = logger.logGroup('getSkuIds invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = promise.chunk(uniqSkus, pageSize);
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
const getSkuIds = promise.pDebounce(_getSkuIds, { wait: 50, maxWait: 100 });
const getSkuId = promise.memoize(async (sku) => {
  return await getSkuIds([sku]).then((result) => result[sku]);
});
const getSku = promise.memoize(async (sku) => {
  const id = await getSkuId(sku);
  if (id === undefined) {
    return undefined;
  }
  const client = await promise.createClient(promise.getConfig());
  return await client.skus.retrieve(id);
});

const CLAddToCart = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Quantity
     */
    this.quantity = 1;
  }
  logSku(sku) {
    if (!this.validateSku(sku)) {
      logger.log('warn', '"sku" should be a not empty string.', this.host);
    }
  }
  logQuantity(quantity) {
    if (!this.validateQuantity(quantity)) {
      logger.log('warn', '"quantity" should be a number equal or greater than 0.', this.host);
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
        logger.log('warn', `Cannot find sku ${this.sku}.`, this.host);
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
      cart.addItem(this.sku, this.quantity).catch((error) => {
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
    return (index.h(index.Host, { role: 'button', tabindex: '0', "aria-disabled": enabled ? undefined : 'true', onKeyPress: (event) => this.handleKeyPress(event), onClick: () => this.handleAddItem() }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "sku": ["watchSkuHandler"],
    "quantity": ["watchQuantityHandler"]
  }; }
};

exports.cl_add_to_cart = CLAddToCart;
