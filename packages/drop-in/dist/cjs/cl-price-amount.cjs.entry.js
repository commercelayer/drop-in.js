'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-59aec873.js');

const CLPriceAmount = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.type = 'price';
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
    return (index.h(index.Host, null, this.type === 'compare-at' ? (index.h("s", { part: 'strikethrough' }, this.price)) : (this.price)));
  }
};

exports.cl_price_amount = CLPriceAmount;
