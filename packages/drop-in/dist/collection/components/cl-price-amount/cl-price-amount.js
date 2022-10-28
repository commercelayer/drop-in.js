import { h, Host } from '@stencil/core';
export class CLPriceAmount {
  constructor() {
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
      default:
        break;
    }
  }
  render() {
    return (h(Host, null, this.type === 'compare-at' ? (h("s", { part: 'strikethrough' }, this.price)) : (this.price)));
  }
  static get is() { return "cl-price-amount"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'price' | 'compare-at'",
          "resolved": "\"compare-at\" | \"price\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'price'"
      }
    };
  }
  static get states() {
    return {
      "price": {}
    };
  }
  static get listeners() {
    return [{
        "name": "priceUpdate",
        "method": "priceUpdateHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
