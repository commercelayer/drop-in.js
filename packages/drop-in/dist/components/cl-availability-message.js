import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const ClAvailabilityMessage$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.format = undefined;
    this.message = undefined;
    this.displayMessage = undefined;
  }
  skuUpdateHandler(event) {
    var _a, _b;
    if (this.format === undefined || this.message === undefined) {
      return;
    }
    const deliveryLeadTime = (_b = (_a = event.detail.inventory) === null || _a === void 0 ? void 0 : _a.levels[0]) === null || _b === void 0 ? void 0 : _b.delivery_lead_times[0];
    if (deliveryLeadTime === undefined) {
      return;
    }
    const min = deliveryLeadTime.min[this.format];
    const max = deliveryLeadTime.max[this.format];
    if (min !== undefined && max !== undefined) {
      this.displayMessage = this.message
        .replace(/\{min\}/g, min.toFixed(0))
        .replace(/\{max\}/g, max.toFixed(0));
    }
  }
  render() {
    return h(Host, null, this.displayMessage);
  }
}, [1, "cl-availability-message", {
    "format": [513],
    "message": [513],
    "displayMessage": [32]
  }, [[0, "skuUpdate", "skuUpdateHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-availability-message"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-availability-message":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ClAvailabilityMessage$1);
      }
      break;
  } });
}

const ClAvailabilityMessage = ClAvailabilityMessage$1;
const defineCustomElement = defineCustomElement$1;

export { ClAvailabilityMessage, defineCustomElement };
