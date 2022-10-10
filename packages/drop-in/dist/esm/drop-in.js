import { p as promiseResolve, b as bootstrapLazy } from './index-67acc321.js';
import { g as globalScripts } from './app-globals-2b3fde0f.js';
import './app-a42bb786.js';
import './logger-5483df89.js';

/*
 Stencil Client Patch Browser v2.18.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["cl-add-to-cart_5",[[1,"cl-add-to-cart",{"sku":[513],"quantity":[1538]}],[1,"cl-cart-count",{"count":[32]},[[8,"cartUpdate","cartUpdateHandler"]]],[1,"cl-cart-link",{"target":[513],"href":[32]}],[1,"cl-price",{"sku":[513]},[[0,"priceUpdate","priceUpdateHandler"]]],[1,"cl-price-amount",{"type":[513],"price":[32]},[[0,"priceUpdate","priceUpdateHandler"]]]]]], options);
});
