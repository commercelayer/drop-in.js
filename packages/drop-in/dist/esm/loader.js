import { B as BUILD, C as CSS, p as plt, w as win, a as promiseResolve, b as bootstrapLazy } from './index-f356444b.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Esm v2.18.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if (BUILD.cssVarShim && !(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return import(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-b3f2ee8d.js').then(() => {
            if ((plt.$cssShim$ = win.__cssshim)) {
                return plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  globalScripts();
  return bootstrapLazy([["cl-add-to-cart",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538],"skuObject":[32]}]]],["cl-cart",[[1,"cl-cart",{"href":[32]}]]],["cl-cart-count",[[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]]]],["cl-cart-link",[[1,"cl-cart-link",{"target":[513],"href":[32]},[[8,"cartUpdate","cartUpdateHandler"]]]]],["cl-price",[[1,"cl-price",{"sku":[513]}]]],["cl-price-amount",[[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]]], options);
  });
};

export { defineCustomElements };
