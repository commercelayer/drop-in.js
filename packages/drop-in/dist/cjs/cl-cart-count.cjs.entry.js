'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-59aec873.js');
const cart = require('./cart-049301c5.js');
require('./promise-c0988a5f.js');

const ClCartCount = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    await cart.triggerCartUpdate(null);
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
    return index.h(index.Host, { quantity: this.count }, this.count);
  }
};

exports.cl_cart_count = ClCartCount;
