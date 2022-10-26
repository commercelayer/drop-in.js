import { r as registerInstance, h, e as Host } from './index-f356444b.js';

const CLPriceAmount = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, null, this.type === 'compare-at' ? (h("s", { part: 'strikethrough' }, this.price)) : (this.price)));
  }
};

export { CLPriceAmount as cl_price_amount };
