import { log } from '#utils/logger';
import { pDebounce } from '#utils/promise';
import { chunk, uniq } from '../utils/utils';
import { createClient } from './commercelayer/client';
import { getConfig } from './commercelayer/config';
export const _getPrices = async (skus) => {
  const client = await createClient(getConfig());
  const uniqSkus = uniq(skus);
  log('groupCollapsed', 'getPrices invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = chunk(uniqSkus, pageSize);
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
  log('groupEnd');
  return prices;
};
const getPrices = pDebounce(_getPrices, { wait: 100, maxWait: 500 });
const priceCache = {};
export const getPrice = async (sku) => {
  if (sku in priceCache) {
    return priceCache[sku];
  }
  return await getPrices([sku]).then((result) => {
    priceCache[sku] = result[sku];
    return result[sku];
  });
};
