'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c9fa7b39.js');
const logger = require('./logger-dbb3111f.js');

/**
 * Create a draft order.
 * @see https://docs.commercelayer.io/core/v/how-tos/shopping-cart/create-a-shopping-cart
 * @returns Returns the created draft order.
 */
async function createEmptyCart() {
  const client = await logger.createClient(logger.getConfig());
  const order = await client.orders.create({});
  setCartId(order.id);
  await triggerCartUpdate(order);
  return order;
}
function setCartId(cartId) {
  logger.js_cookie.set(logger.getKeyForCart(), cartId);
}
function getCartId() {
  var _a;
  return (_a = logger.js_cookie.get(logger.getKeyForCart())) !== null && _a !== void 0 ? _a : null;
}
function isValidUrl(url) {
  const cartId = getCartId();
  return cartId !== null && url.includes(`/${cartId}?`);
}
/**
 * Get the Hosted Cart url.
 * @param forceCartToExist When true it will create an empty cart if not existing before.
 * @returns Returns the Hosted Cart url.
 */
async function getCartUrl(forceCartToExist = false) {
  const config = logger.getConfig();
  const accessToken = await logger.getAccessToken(config);
  let cartId = getCartId();
  if (cartId === null && forceCartToExist) {
    const cart = await createEmptyCart();
    cartId = cart.id;
  }
  return `https://${config.slug}.commercelayer.app/cart/${cartId !== null && cartId !== void 0 ? cartId : 'null'}?accessToken=${accessToken}`;
}
async function getCart() {
  const client = await logger.createClient(logger.getConfig());
  const orderId = getCartId();
  if (orderId === null) {
    return null;
  }
  const order = await client.orders.retrieve(orderId).catch(() => null);
  await triggerCartUpdate(order);
  return order;
}
async function triggerCartUpdate(order) {
  // TODO: manage events in separate file
  if (order === null) {
    const order = await getCart();
    if (order !== null) {
      window.dispatchEvent(new CustomEvent('cartUpdate', { detail: order }));
    }
  }
  else {
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: order }));
  }
}
async function addItem(sku, quantity) {
  var _a;
  const client = await logger.createClient(logger.getConfig());
  const orderId = (_a = getCartId()) !== null && _a !== void 0 ? _a : (await (await createEmptyCart()).id);
  await client.line_items.create({
    order: {
      id: orderId,
      type: 'orders'
    },
    quantity,
    sku_code: sku,
    _update_quantity: true
  });
  await triggerCartUpdate(null);
}

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
  componentWillLoad() {
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
    // TODO: check for stock
    return this.validateSku(this.sku) && this.quantity > 0;
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
    await triggerCartUpdate(null);
  }
  cartUpdateHandler(event) {
    if (event.detail.skus_count !== undefined && event.detail.skus_count > 0) {
      this.count = event.detail.skus_count;
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
    this.href = await getCartUrl();
  }
  async handleClick(event) {
    if (this.href === undefined || !isValidUrl(this.href)) {
      event.preventDefault();
      this.href = await getCartUrl(true);
      window.open(this.href, this.target);
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
  componentWillLoad() {
    this.logSku(this.sku);
  }
  watchPropHandler(newValue, _oldValue) {
    this.logSku(newValue);
  }
  priceUpdateHandler({ type, detail }) {
    this.host.querySelectorAll('cl-price-amount').forEach((element) => {
      element.dispatchEvent(new CustomEvent(type, { detail }));
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
