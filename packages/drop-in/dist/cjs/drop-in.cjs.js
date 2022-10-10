'use strict';

const index = require('./index-c9fa7b39.js');
const appGlobals = require('./app-globals-f8f6cde3.js');
require('./app-d92317a8.js');
require('./logger-dbb3111f.js');

/*
 Stencil Client Patch Browser v2.18.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('drop-in.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  appGlobals.globalScripts();
  return index.bootstrapLazy([["cl-add-to-cart_5.cjs",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538]}],[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-cart-link",{"target":[513],"href":[32]}],[1,"cl-price",{"sku":[513]},[[0,"priceUpdate","priceUpdateHandler"]]],[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]]], options);
});
