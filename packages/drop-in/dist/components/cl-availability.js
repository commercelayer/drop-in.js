import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { g as getSku } from './skus.js';
import { a as validateSku, l as logSku } from './validation-helpers.js';

const ClAvailability$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    this.host
      .querySelectorAll('cl-availability-status, cl-availability-message')
      .forEach((element) => {
      element.dispatchEvent(new CustomEvent('skuUpdate', { detail: sku }));
    });
  }
  render() {
    return h("slot", null);
  }
  get host() { return this; }
  static get watchers() { return {
    "sku": ["watchPropHandler"]
  }; }
}, [1, "cl-availability", {
    "sku": [513]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-availability"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-availability":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ClAvailability$1);
      }
      break;
  } });
}

const ClAvailability = ClAvailability$1;
const defineCustomElement = defineCustomElement$1;

export { ClAvailability, defineCustomElement };
