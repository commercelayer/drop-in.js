import { log } from '#utils/logger';
import { h } from '@stencil/core';
export class CLPrice {
  logSku(sku) {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not string.', this.host);
    }
  }
  validateSku(sku) {
    return typeof sku === 'string' && sku !== '';
  }
  componentWillLoad() {
    this.logSku(this.sku);
  }
  watchPropHandler(newValue, _oldValue) {
    this.logSku(newValue);
  }
  priceUpdateHandler({ type, detail }) {
    this.host.querySelectorAll('cl-price-amount').forEach((element) => {
      element.dispatchEvent(new CustomEvent(type, { detail }));
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
          "text": "Sku code"
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
