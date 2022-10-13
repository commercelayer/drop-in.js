'use strict';

const logger = require('./logger-c7277a91.js');

const componentName = 'cl-price';
function getSku(element) {
  return element.sku;
}
const registerPrices = async (client, elements = Array.from(document.querySelectorAll(componentName))) => {
  await customElements.whenDefined(componentName);
  logger.log('group', 'registerPrices invoked');
  logger.log('info', `found`, elements.length, componentName);
  const skus = logger.uniq(elements.map(getSku).filter(logger.isNotNullish));
  logger.log('info', `found`, skus.length, 'unique skus', skus);
  const pageSize = 25;
  const chunkedSkus = logger.chunk(skus, pageSize);
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
  logger.log('groupEnd');
};

const registrableNodes = {
  'cl-price': isClPrice
};
function isClPrice(element) {
  return element.nodeName.toLowerCase() === 'cl-price';
}
const initialize = async function () {
  const clClient = await logger.createClient(logger.getConfig());
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

exports.initialize = initialize;
