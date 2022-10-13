'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8f2f0854.js');
const appGlobals = require('./app-globals-d437107c.js');
require('./app-565ff38b.js');
require('./logger-c7277a91.js');

/*
 Stencil Client Patch Esm v2.18.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  appGlobals.globalScripts();
  return index.bootstrapLazy([["cl-add-to-cart_6.cjs",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538]}],[1,"cl-cart",{"href":[32]}],[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-cart-link",{"target":[513],"href":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-price",{"sku":[513]},[[0,"priceUpdate","priceUpdateHandler"]]],[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
