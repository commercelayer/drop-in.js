import { p as promiseResolve, b as bootstrapLazy } from './index-31d6f700.js';
import { g as globalScripts } from './app-globals-da3f7792.js';
import './app-b51edcaf.js';
import './logger-f397dbdc.js';

/*
 Stencil Client Patch Esm v2.18.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  globalScripts();
  return bootstrapLazy([["cl-add-to-cart_6",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538]}],[1,"cl-cart",{"href":[32]}],[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-cart-link",{"target":[513],"href":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-price",{"sku":[513]},[[0,"priceUpdate","priceUpdateHandler"]]],[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]]], options);
  });
};

export { defineCustomElements };
