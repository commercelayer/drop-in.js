import { addItem } from '#apis/commercelayer/cart';
import { getSku } from '#apis/commercelayer/skus';
import { log } from '#utils/logger';
import { logQuantity, logSku, validateQuantity, validateSku } from '#utils/validation-helpers';
import { h, Host } from '@stencil/core';
export class CLAddToCart {
  constructor() {
    this.sku = undefined;
    this.quantity = 1;
    this.skuObject = undefined;
  }
  watchSkuHandler(newValue, _oldValue) {
    logSku(this.host, newValue);
  }
  watchQuantityHandler(newValue, _oldValue) {
    if (!validateQuantity(newValue)) {
      this.quantity = 0;
    }
  }
  async componentWillLoad() {
    if (validateSku(this.sku)) {
      this.skuObject = await getSku(this.sku);
      if (this.skuObject === undefined) {
        log('warn', `Cannot find sku ${this.sku}.`, this.host);
      }
    }
    logSku(this.host, this.sku);
    logQuantity(this.host, this.quantity);
  }
  handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleAddItem();
    }
  }
  handleAddItem() {
    if (this.sku !== undefined && this.canBeSold()) {
      addItem(this.sku, this.quantity).catch((error) => {
        throw error;
      });
    }
  }
  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold() {
    var _a, _b, _c, _d;
    // TODO: check for stock
    return (validateSku(this.sku) &&
      this.quantity > 0 &&
      // @ts-expect-error
      ((_b = (_a = this.skuObject) === null || _a === void 0 ? void 0 : _a.inventory) === null || _b === void 0 ? void 0 : _b.available) === true &&
      // @ts-expect-error
      this.quantity <= ((_d = (_c = this.skuObject) === null || _c === void 0 ? void 0 : _c.inventory) === null || _d === void 0 ? void 0 : _d.quantity));
  }
  render() {
    const enabled = this.canBeSold();
    return (h(Host, { role: 'button', tabindex: '0', "aria-disabled": enabled ? undefined : 'true', onKeyPress: (event) => this.handleKeyPress(event), onClick: () => this.handleAddItem() }, h("slot", null)));
  }
  static get is() { return "cl-add-to-cart"; }
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
      },
      "quantity": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "quantity",
        "reflect": true,
        "defaultValue": "1"
      }
    };
  }
  static get states() {
    return {
      "skuObject": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "sku",
        "methodName": "watchSkuHandler"
      }, {
        "propName": "quantity",
        "methodName": "watchQuantityHandler"
      }];
  }
}
