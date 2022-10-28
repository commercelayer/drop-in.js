import { getPrice } from '#apis/commercelayer/prices';
import { logSku, validateSku } from '#utils/validation-helpers';
import { h } from '@stencil/core';
export class CLPrice {
  constructor() {
    this.sku = undefined;
  }
  async componentWillLoad() {
    if (validateSku(this.sku)) {
      const price = await getPrice(this.sku);
      if (price !== undefined) {
        this.updatePrice(price);
      }
    }
    logSku(this.host, this.sku);
  }
  watchPropHandler(newValue, _oldValue) {
    logSku(this.host, newValue);
  }
  updatePrice(price) {
    this.host.querySelectorAll('cl-price-amount').forEach((element) => {
      element.dispatchEvent(new CustomEvent('priceUpdate', { detail: price }));
    });
  }
  render() {
    return h("slot", null);
  }
  static get is() { return "cl-price"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "sku": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | undefined",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "sku",
        "reflect": true
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "sku",
        "methodName": "watchPropHandler"
      }];
  }
}
