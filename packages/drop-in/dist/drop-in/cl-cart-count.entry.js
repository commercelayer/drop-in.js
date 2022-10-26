import { r as registerInstance, h, e as Host } from './index-f356444b.js';
import { t as triggerCartUpdate } from './cart-39ffce27.js';
import './promise-e502bcc3.js';

const ClCartCount = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};

export { ClCartCount as cl_cart_count };
