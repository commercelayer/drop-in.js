import { getCartUrl, triggerCartUpdate } from '#apis/commercelayer/cart';
import { Host, h } from '@stencil/core';
import { iframeResizer } from 'iframe-resizer';
export class ClCart {
  constructor() {
    this.href = undefined;
  }
  async componentWillLoad() {
    this.href = await getCartUrl();
  }
  componentDidLoad() {
    iframeResizer({
      checkOrigin: false,
      // 'messageCallback' has been renamed 'onMessage'. The old method will be removed in the next major version.
      // @ts-expect-error
      onMessage(data) {
        if (data.message.type === 'updateCart') {
          triggerCartUpdate(null).catch((error) => {
            throw error;
          });
        }
      }
    }, this.iframe);
  }
  render() {
    return (h(Host, null, h("iframe", { ref: (el) => (this.iframe = el), src: this.href, frameBorder: 0, style: {
        width: '1px',
        'min-width': '100%',
        'min-height': '100%',
        overflow: 'hidden'
      }, scrolling: 'no' })));
  }
  static get is() { return "cl-cart"; }
  static get encapsulation() { return "shadow"; }
  static get states() {
    return {
      "href": {}
    };
  }
  static get elementRef() { return "host"; }
}
