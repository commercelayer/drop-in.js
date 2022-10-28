import { getSku } from '#apis/commercelayer/skus';
import { logSku, validateSku } from '#utils/validation-helpers';
import { h } from '@stencil/core';
export class ClAvailability {
  constructor() {
    this.sku = undefined;
  }
  async componentWillLoad() {
    if (validateSku(this.sku)) {
      const sku = await getSku(this.sku);
      if (sku !== undefined) {
        this.updateAvailability(sku);
      }
    }
    logSku(this.host, this.sku);
  }
  watchPropHandler(newValue, _oldValue) {
    logSku(this.host, newValue);
  }
  updateAvailability(sku) {
    this.host.querySelectorAll('cl-availability-status').forEach((element) => {
      element.dispatchEvent(new CustomEvent('skuUpdate', { detail: sku }));
    });
  }
  render() {
    return h("slot", null);
  }
  static get is() { return "cl-availability"; }
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
