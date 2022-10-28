import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const CLPriceAmount = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
}, [1, "cl-price-amount", {
    "type": [513],
    "price": [32]
  }, [[0, "priceUpdate", "priceUpdateHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-price-amount"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-price-amount":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CLPriceAmount);
      }
      break;
  } });
}

const ClPriceAmount = CLPriceAmount;
const defineCustomElement = defineCustomElement$1;

export { ClPriceAmount, defineCustomElement };
