import { r as registerInstance, h, g as getElement } from './index-f356444b.js';
import { g as getCartUrl, i as isValidUrl } from './cart-39ffce27.js';
import './promise-e502bcc3.js';

const CLCartLink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Target
     */
    this.target = '_self';
  }
  async componentWillLoad() {
    this.href = await getCartUrl();
  }
  async handleClick(event) {
    if (this.href === undefined || !isValidUrl(this.href)) {
      event.preventDefault();
      this.href = await getCartUrl(true);
      window.open(this.href, this.target);
    }
  }
  async cartUpdateHandler(_event) {
    if (this.href === undefined || !isValidUrl(this.href)) {
      this.href = await getCartUrl();
    }
  }
  render() {
    return (h("a", { target: this.target, href: this.href, onClick: (e) => {
        this.handleClick(e).catch((error) => {
          throw error;
        });
      } }, h("slot", null)));
  }
  get host() { return getElement(this); }
};

export { CLCartLink as cl_cart_link };
