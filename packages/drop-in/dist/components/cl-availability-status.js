import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const ClAvailabilityStatus$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.type = undefined;
    this.available = undefined;
  }
  skuUpdateHandler(event) {
    var _a;
    this.available = (_a = event.detail.inventory) === null || _a === void 0 ? void 0 : _a.available;
  }
  render() {
    if ((this.type === 'available' && this.available === true) ||
      (this.type === 'unavailable' && this.available === false)) {
      return h("slot", null);
    }
    return h(Host, { "aria-disabled": 'true' });
  }
}, [1, "cl-availability-status", {
    "type": [513],
    "available": [32]
  }, [[0, "skuUpdate", "skuUpdateHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-availability-status"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-availability-status":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ClAvailabilityStatus$1);
      }
      break;
  } });
}

const ClAvailabilityStatus = ClAvailabilityStatus$1;
const defineCustomElement = defineCustomElement$1;

export { ClAvailabilityStatus, defineCustomElement };
