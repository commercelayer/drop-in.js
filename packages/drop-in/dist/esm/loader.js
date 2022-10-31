import { p as promiseResolve, b as bootstrapLazy } from './index-dc67f28a.js';

/*
 Stencil Client Patch Esm v2.19.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["cl-add-to-cart_8",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538],"skuObject":[32]}],[1,"cl-availability",{"sku":[513]}],[1,"cl-availability-message",{"format":[513],"message":[513],"displayMessage":[32]},[[0,"skuUpdate","skuUpdateHandler"]]],[1,"cl-availability-status",{"type":[513],"available":[32]},[[0,"skuUpdate","skuUpdateHandler"]]],[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-cart-link",{"target":[513],"href":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-price",{"sku":[513]}],[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]],["cl-cart",[[1,"cl-cart",{"href":[32]}]]]], options);
  });
};

export { defineCustomElements };
