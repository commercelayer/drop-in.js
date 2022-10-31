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
    this.price = event.detail;
  }
  render() {
    var _a, _b, _c, _d;
    const hasStrikethrough = ((_a = this.price) === null || _a === void 0 ? void 0 : _a.formatted_compare_at_amount) !== ((_b = this.price) === null || _b === void 0 ? void 0 : _b.formatted_amount);
    return (h(Host, null, this.type === 'compare-at'
      ? hasStrikethrough && (h("s", { part: 'strikethrough' }, (_c = this.price) === null || _c === void 0 ? void 0 : _c.formatted_compare_at_amount))
      : (_d = this.price) === null || _d === void 0 ? void 0 : _d.formatted_amount));
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
