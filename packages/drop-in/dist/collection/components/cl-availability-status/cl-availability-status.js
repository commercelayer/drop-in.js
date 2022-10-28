import { h, Host } from '@stencil/core';
export class ClAvailabilityStatus {
  constructor() {
    this.type = undefined;
    this.available = undefined;
  }
  skuUpdateHandler(event) {
    var _a;
    // @ts-expect-error
    this.available = (_a = event.detail.inventory) === null || _a === void 0 ? void 0 : _a.available;
  }
  render() {
    if ((this.type === 'available' && this.available === true) ||
      (this.type === 'unavailable' && this.available === false)) {
      return h("slot", null);
    }
    return h(Host, { "aria-disabled": 'true' });
  }
  static get is() { return "cl-availability-status"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'available' | 'unavailable' | undefined",
          "resolved": "\"available\" | \"unavailable\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "available": {}
    };
  }
  static get listeners() {
    return [{
        "name": "skuUpdate",
        "method": "skuUpdateHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
