import { h, Host } from '@stencil/core';
export class ClAvailabilityMessage {
  constructor() {
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
  static get is() { return "cl-availability-message"; }
  static get encapsulation() { return "shadow"; }
  static get properties() {
    return {
      "format": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'days' | 'hours' | undefined",
          "resolved": "\"days\" | \"hours\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "format",
        "reflect": true
      },
      "message": {
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
        "attribute": "message",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "displayMessage": {}
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
