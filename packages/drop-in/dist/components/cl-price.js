import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { l as log } from './logger.js';

const CLPrice = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  logSku(sku) {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not string.', this.host);
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
    return h("slot", null);
  }
  get host() { return this; }
  static get watchers() { return {
    "sku": ["watchPropHandler"]
  }; }
}, [1, "cl-price", {
    "sku": [513]
  }, [[0, "priceUpdate", "priceUpdateHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-price"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-price":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CLPrice);
      }
      break;
  } });
}

const ClPrice = CLPrice;
const defineCustomElement = defineCustomElement$1;

export { ClPrice, defineCustomElement };
