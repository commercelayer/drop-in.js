import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { g as getCartUrl, i as isValidUrl } from './cart.js';

const CLCartLink = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  async cartUpdateHandler(_event) {
    if (this.href === undefined || !isValidUrl(this.href)) {
      this.href = await getCartUrl();
    }
  }
  render() {
    return (h("a", { target: this.target, href: this.href, onClick: (e) => {
        this.handleClick(e).catch((error) => {
          throw error;
        });
      } }, h("slot", null)));
  }
  get host() { return this; }
}, [1, "cl-cart-link", {
    "target": [513],
    "href": [32]
  }, [[8, "cartUpdate", "cartUpdateHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cl-cart-link"];
  components.forEach(tagName => { switch (tagName) {
    case "cl-cart-link":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CLCartLink);
      }
      break;
  } });
}

const ClCartLink = CLCartLink;
const defineCustomElement = defineCustomElement$1;

export { ClCartLink, defineCustomElement };
