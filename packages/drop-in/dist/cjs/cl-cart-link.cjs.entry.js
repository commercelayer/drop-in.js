'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-59aec873.js');
const cart = require('./cart-049301c5.js');
require('./promise-c0988a5f.js');

const CLCartLink = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Target
     */
    this.target = '_self';
  }
  async componentWillLoad() {
    this.href = await cart.getCartUrl();
  }
  async handleClick(event) {
    if (this.href === undefined || !cart.isValidUrl(this.href)) {
      event.preventDefault();
      this.href = await cart.getCartUrl(true);
      window.open(this.href, this.target);
    }
  }
  async cartUpdateHandler(_event) {
    if (this.href === undefined || !cart.isValidUrl(this.href)) {
      this.href = await cart.getCartUrl();
    }
  }
  render() {
    return (index.h("a", { target: this.target, href: this.href, onClick: (e) => {
        this.handleClick(e).catch((error) => {
          throw error;
        });
      } }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
};

exports.cl_cart_link = CLCartLink;
