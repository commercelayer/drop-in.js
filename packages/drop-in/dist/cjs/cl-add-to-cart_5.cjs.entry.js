'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8f2f0854.js');
const cart = require('./cart-e3dcfb1f.js');

/**
 * Outputs a message to the Web console.
 * @param type Type of message.
 * @param messages List of messages.
 */
const log = (type, ...messages) => {
  const { debug } = cart.getConfig();
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

const _getSkuIds = async (skus) => {
  const client = await cart.createClient(cart.getConfig());
  const uniqSkus = cart.uniq(skus);
  const log = logGroup('getSkuIds invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = cart.chunk(uniqSkus, pageSize);
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
const getSkuIds = cart.pDebounce(_getSkuIds, { wait: 50, maxWait: 100 });
const getSkuId = cart.memoize(async (sku) => {
  return await getSkuIds([sku]).then((result) => result[sku]);
});
const getSku = cart.memoize(async (sku) => {
  const id = await getSkuId(sku);
  if (id === undefined) {
    return undefined;
  }
  const client = await cart.createClient(cart.getConfig());
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

const ClCartCount = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    await cart.triggerCartUpdate(null);
  }
  cartUpdateHandler(event) {
    if (event.detail.skus_count !== undefined && event.detail.skus_count > 0) {
      this.count = event.detail.skus_count;
    }
    else {
      this.count = undefined;
    }
  }
  render() {
    return index.h(index.Host, { quantity: this.count }, this.count);
  }
};

const CLCartLink = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Target
     */
    this.target = '_self';
  }
  async componentWillLoad() {
    this.href = await cart.getCartUrl();
  }
  async handleClick(event) {
    if (this.href === undefined || !cart.isValidUrl(this.href)) {
      event.preventDefault();
      this.href = await cart.getCartUrl(true);
      window.open(this.href, this.target);
    }
  }
  async cartUpdateHandler(_event) {
    if (this.href === undefined || !cart.isValidUrl(this.href)) {
      this.href = await cart.getCartUrl();
    }
  }
  render() {
    return (index.h("a", { target: this.target, href: this.href, onClick: (e) => {
        this.handleClick(e).catch((error) => {
          throw error;
        });
      } }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
};

const _getPrices = async (skus) => {
  const client = await cart.createClient(cart.getConfig());
  const uniqSkus = cart.uniq(skus);
  const log = logGroup('getPrices invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = cart.chunk(uniqSkus, pageSize);
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
const getPrices = cart.pDebounce(_getPrices, { wait: 50, maxWait: 100 });
const getPrice = cart.memoize(async (sku) => {
  return await getPrices([sku]).then((result) => result[sku]);
});

const CLPrice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return index.h("slot", null);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "sku": ["watchPropHandler"]
  }; }
};

const CLPriceAmount = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.type = 'price';
  }
  priceUpdateHandler(event) {
    switch (this.type) {
      case 'compare-at':
        this.price = event.detail.formatted_compare_at_amount;
        break;
      case 'price':
        this.price = event.detail.formatted_amount;
        break;
    }
  }
  render() {
    return (index.h(index.Host, null, this.type === 'compare-at' ? (index.h("s", { part: 'strikethrough' }, this.price)) : (this.price)));
  }
};

exports.cl_add_to_cart = CLAddToCart;
exports.cl_cart_count = ClCartCount;
exports.cl_cart_link = CLCartLink;
exports.cl_price = CLPrice;
exports.cl_price_amount = CLPriceAmount;
