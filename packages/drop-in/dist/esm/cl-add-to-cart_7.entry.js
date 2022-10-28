import { r as registerInstance, h, H as Host, g as getElement } from './index-dc67f28a.js';
import { g as getConfig, p as pDebounce, m as memoize, c as createClient, a as chunk, u as uniq, b as addItem, t as triggerCartUpdate, d as getCartUrl, i as isValidUrl } from './cart-1518a9d0.js';

/**
 * Outputs a message to the Web console.
 * @param type Type of message.
 * @param messages List of messages.
 */
const log = (type, ...messages) => {
  const { debug } = getConfig();
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
      filters: { code_in: skus.join(',') },
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

function validateSku(sku) {
  return typeof sku === 'string' && sku !== '';
}
function logSku(host, sku) {
  if (!validateSku(sku)) {
    log('warn', '"sku" should be a not empty string.', host);
  }
}
function validateQuantity(quantity) {
  return quantity >= 0;
}
function logQuantity(host, quantity) {
  if (!validateQuantity(quantity)) {
    log('warn', '"quantity" should be a number equal or greater than 0.', host);
  }
}

const CLAddToCart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sku = undefined;
    this.quantity = 1;
    this.skuObject = undefined;
  }
  watchSkuHandler(newValue, _oldValue) {
    logSku(this.host, newValue);
  }
  watchQuantityHandler(newValue, _oldValue) {
    if (!validateQuantity(newValue)) {
      this.quantity = 0;
    }
  }
  async componentWillLoad() {
    if (validateSku(this.sku)) {
      this.skuObject = await getSku(this.sku);
      if (this.skuObject === undefined) {
        log('warn', `Cannot find sku ${this.sku}.`, this.host);
      }
    }
    logSku(this.host, this.sku);
    logQuantity(this.host, this.quantity);
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
    var _a, _b, _c, _d;
    // TODO: check for stock
    return (validateSku(this.sku) &&
      this.quantity > 0 &&
      // @ts-expect-error
      ((_b = (_a = this.skuObject) === null || _a === void 0 ? void 0 : _a.inventory) === null || _b === void 0 ? void 0 : _b.available) === true &&
      // @ts-expect-error
      this.quantity <= ((_d = (_c = this.skuObject) === null || _c === void 0 ? void 0 : _c.inventory) === null || _d === void 0 ? void 0 : _d.quantity));
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

const ClAvailability = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sku = undefined;
  }
  async componentWillLoad() {
    if (validateSku(this.sku)) {
      const sku = await getSku(this.sku);
      if (sku !== undefined) {
        this.updateAvailability(sku);
      }
    }
    logSku(this.host, this.sku);
  }
  watchPropHandler(newValue, _oldValue) {
    logSku(this.host, newValue);
  }
  updateAvailability(sku) {
    this.host.querySelectorAll('cl-availability-status').forEach((element) => {
      element.dispatchEvent(new CustomEvent('skuUpdate', { detail: sku }));
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

const ClAvailabilityStatus = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = undefined;
    this.available = undefined;
  }
  skuUpdateHandler(event) {
    var _a;
    // @ts-expect-error
    this.available = (_a = event.detail.inventory) === null || _a === void 0 ? void 0 : _a.available;
  }
  render() {
    if ((this.type === 'available' && this.available === true) ||
      (this.type === 'unavailable' && this.available === false)) {
      return h("slot", null);
    }
    return h(Host, { "aria-disabled": 'true' });
  }
};

const ClCartCount = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.count = undefined;
  }
  async componentWillLoad() {
    await triggerCartUpdate(null);
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
    return h(Host, { quantity: this.count }, this.count);
  }
};

const CLCartLink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.target = '_self';
    this.href = undefined;
  }
  async componentWillLoad() {
    this.href = await getCartUrl();
  }
  async handleClick(event) {
    if (this.href === undefined || !isValidUrl(this.href)) {
      event.preventDefault();
      this.href = await getCartUrl(true);
      window.open(this.href, this.target);
    }
  }
  async cartUpdateHandler(_event) {
    if (this.href === undefined || !isValidUrl(this.href)) {
      this.href = await getCartUrl();
    }
  }
  render() {
    return (h("a", { target: this.target, href: this.href, onClick: (e) => {
        this.handleClick(e).catch((error) => {
          throw error;
        });
      } }, h("slot", null)));
  }
  get host() { return getElement(this); }
};

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
    this.sku = undefined;
  }
  async componentWillLoad() {
    if (validateSku(this.sku)) {
      const price = await getPrice(this.sku);
      if (price !== undefined) {
        this.updatePrice(price);
      }
    }
    logSku(this.host, this.sku);
  }
  watchPropHandler(newValue, _oldValue) {
    logSku(this.host, newValue);
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

const CLPriceAmount = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'price';
    this.price = undefined;
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
    return (h(Host, null, this.type === 'compare-at' ? (h("s", { part: 'strikethrough' }, this.price)) : (this.price)));
  }
};

export { CLAddToCart as cl_add_to_cart, ClAvailability as cl_availability, ClAvailabilityStatus as cl_availability_status, ClCartCount as cl_cart_count, CLCartLink as cl_cart_link, CLPrice as cl_price, CLPriceAmount as cl_price_amount };
