import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { a as addItem } from './cart.js';
import { l as logGroup, a as log } from './logger.js';
import { p as pDebounce, c as createClient, g as getConfig, a as chunk, m as memoize, u as uniq } from './promise.js';

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

const CLAddToCart = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  get host() { return this; }
  static get watchers() { return {
    "sku": ["watchSkuHandler"],
    "quantity": ["watchQuantityHandler"]
  }; }
}, [1, "cl-add-to-cart", {
    "sku": [513],
    "quantity": [1538],
    "skuObject": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-add-to-cart"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-add-to-cart":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CLAddToCart);
      }
      break;
  } });
}

const ClAddToCart = CLAddToCart;
const defineCustomElement = defineCustomElement$1;

export { ClAddToCart, defineCustomElement };
