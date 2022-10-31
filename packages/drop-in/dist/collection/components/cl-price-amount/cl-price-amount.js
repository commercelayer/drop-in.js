import { h, Host } from '@stencil/core';
export class CLPriceAmount {
  constructor() {
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
