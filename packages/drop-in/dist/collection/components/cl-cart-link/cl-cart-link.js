import { getCartUrl, isValidUrl } from '#apis/commercelayer/cart';
import { h } from '@stencil/core';
export class CLCartLink {
  constructor() {
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
  render() {
    return (h("a", { target: this.target, href: this.href, onClick: (e) => {
        this.handleClick(e).catch((error) => {
          throw error;
        });
      } }, h("slot", null)));
  }
  static get is() { return "cl-cart-link"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "target": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Target"
        },
        "attribute": "target",
        "reflect": true,
        "defaultValue": "'_self'"
      }
    };
  }
  static get states() {
    return {
      "href": {}
    };
  }
  static get elementRef() { return "host"; }
}
