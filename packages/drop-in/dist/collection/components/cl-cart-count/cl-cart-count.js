import { triggerCartUpdate } from '#apis/commercelayer/cart';
import { h, Host } from '@stencil/core';
export class ClCartCount {
  constructor() {
    this.count = undefined;
  }
  async componentWillLoad() {
    await triggerCartUpdate(null);
  }
  cartUpdateHandler(event) {
    if (event.detail.skus_count !== undefined && event.detail.skus_count > 0) {
      this.count = event.detail.skus_count;
    }
    else {
      this.count = undefined;
    }
  }
  render() {
    return h(Host, { quantity: this.count }, this.count);
  }
  static get is() { return "cl-cart-count"; }
  static get encapsulation() { return "shadow"; }
  static get states() {
    return {
      "count": {}
    };
  }
  static get listeners() {
    return [{
        "name": "cartUpdate",
        "method": "cartUpdateHandler",
        "target": "window",
        "capture": false,
        "passive": false
      }];
  }
}
