'use strict';

const index = require('./index-54981266.js');

/*
 Stencil Client Patch Browser v2.19.1 | MIT Licensed | https://stenciljs.com
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
  return index.bootstrapLazy([["cl-add-to-cart_7.cjs",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538],"skuObject":[32]}],[1,"cl-availability",{"sku":[513]}],[1,"cl-availability-status",{"type":[513],"available":[32]},[[0,"skuUpdate","skuUpdateHandler"]]],[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-cart-link",{"target":[513],"href":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-price",{"sku":[513]}],[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]],["cl-cart.cjs",[[1,"cl-cart",{"href":[32]}]]]], options);
});
