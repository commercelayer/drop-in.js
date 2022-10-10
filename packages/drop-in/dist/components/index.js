export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';
import { u as uniq, i as isNotNullish, c as chunk, a as createClient } from './cart.js';
import { g as getConfig } from './config.js';
import { l as log } from './logger.js';
export { ClAddToCart, defineCustomElement as defineCustomElementClAddToCart } from './cl-add-to-cart.js';
export { ClCartCount, defineCustomElement as defineCustomElementClCartCount } from './cl-cart-count.js';
export { ClCartLink, defineCustomElement as defineCustomElementClCartLink } from './cl-cart-link.js';
export { ClPrice, defineCustomElement as defineCustomElementClPrice } from './cl-price.js';
export { ClPriceAmount, defineCustomElement as defineCustomElementClPriceAmount } from './cl-price-amount.js';

const componentName = 'cl-price';
function getSku(element) {
  return element.sku;
}
const registerPrices = async (client, elements = Array.from(document.querySelectorAll(componentName))) => {
  await customElements.whenDefined(componentName);
  log('group', 'registerPrices invoked');
  log('info', `found`, elements.length, componentName);
  const skus = uniq(elements.map(getSku).filter(isNotNullish));
  log('info', `found`, skus.length, 'unique skus', skus);
  const pageSize = 25;
  const chunkedSkus = chunk(skus, pageSize);
  const pricesResponse = (await Promise.all(chunkedSkus.map(async (skus) => {
    return await client.prices.list({
      pageSize,
      filters: { sku_code_in: skus.join(',') }
    });
  }))).flat();
  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const prices = pricesResponse.reduce((prices, price) => {
    if (price.sku_code !== undefined) {
      prices[price.sku_code] = price;
    }
    return prices;
  }, {});
  elements.forEach((element) => {
    const sku = getSku(element);
    if (sku !== undefined) {
      const price = prices[sku];
      if (price != null) {
        element.dispatchEvent(new CustomEvent(`priceUpdate`, { detail: price }));
      }
    }
  });
  log('groupEnd');
};

const registrableNodes = {
  'cl-price': isClPrice
};
function isClPrice(element) {
  return element.nodeName.toLowerCase() === 'cl-price';
}
const initialize = async function () {
  const clClient = await createClient(getConfig());
  await registerPrices(clClient);
  const observer = new MutationObserver((mutationList) => {
    const nodes = mutationList.reduce((nodes, mutation) => {
      if (mutation.type === 'childList') {
        Object.keys(registrableNodes).forEach((nodeName) => {
          nodes[nodeName].push(...Array.from(mutation.addedNodes).filter(registrableNodes[nodeName]));
          nodes[nodeName].push(...Array.from(mutation.addedNodes).flatMap((node) => Array.from(node.querySelectorAll(nodeName))));
          // nodes[nodeName] = nodes[nodeName]
          //   .concat(
          //     Array.from(mutation.addedNodes).filter(
          //       registrableNodes[nodeName]
          //     )
          //   )
          //   .concat(
          //     Array.from(mutation.addedNodes).flatMap((node) =>
          //       Array.from((node as HTMLElement).querySelectorAll(nodeName))
          //     )
          //   )
        });
      }
      return nodes;
    }, { 'cl-price': [] });
    registerPrices(clClient, nodes['cl-price']).catch((error) => {
      throw error;
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

export { initialize };
