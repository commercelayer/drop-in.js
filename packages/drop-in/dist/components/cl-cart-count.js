import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { t as triggerCartUpdate } from './cart.js';

const ClCartCount$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    return h(Host, { quantity: this.count }, this.count);
  }
}, [1, "cl-cart-count", {
    "count": [32]
  }, [[8, "cartUpdate", "cartUpdateHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-cart-count"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-cart-count":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ClCartCount$1);
      }
      break;
  } });
}

const ClCartCount = ClCartCount$1;
const defineCustomElement = defineCustomElement$1;

export { ClCartCount, defineCustomElement };
