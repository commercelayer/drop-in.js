'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-59aec873.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Esm v2.18.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if (index.BUILD.cssVarShim && !(index.CSS && index.CSS.supports && index.CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return Promise.resolve().then(function () { return require(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-b8158822.js'); }).then(() => {
            if ((index.plt.$cssShim$ = index.win.__cssshim)) {
                return index.plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  appGlobals.globalScripts();
  return index.bootstrapLazy([["cl-add-to-cart.cjs",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538],"skuObject":[32]}]]],["cl-cart.cjs",[[1,"cl-cart",{"href":[32]}]]],["cl-cart-count.cjs",[[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]]]],["cl-cart-link.cjs",[[1,"cl-cart-link",{"target":[513],"href":[32]},[[8,"cartUpdate","cartUpdateHandler"]]]]],["cl-price.cjs",[[1,"cl-price",{"sku":[513]}]]],["cl-price-amount.cjs",[[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
