import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { a as addItem } from './cart.js';
import { g as getSku } from './skus.js';
import { l as logSku, v as validateQuantity, a as validateSku, b as log, c as logQuantity } from './validation-helpers.js';

const CLAddToCart = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
      ((_b = (_a = this.skuObject) === null || _a === void 0 ? void 0 : _a.inventory) === null || _b === void 0 ? void 0 : _b.available) === true &&
      this.quantity <= ((_d = (_c = this.skuObject) === null || _c === void 0 ? void 0 : _c.inventory) === null || _d === void 0 ? void 0 : _d.quantity));
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
