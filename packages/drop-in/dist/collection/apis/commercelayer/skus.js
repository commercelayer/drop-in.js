import { logGroup } from '#utils/logger';
import { pDebounce } from '#utils/promise';
import { chunk, memoize, uniq } from '#utils/utils';
import { createClient } from './client';
import { getConfig } from './config';
const _getSkuIds = async (skus) => {
  const client = await createClient(getConfig());
  const uniqSkus = uniq(skus);
  const log = logGroup('getSkuIds invoked');
  log('info', `found`, uniqSkus.length);
  log('info', 'unique skus', uniqSkus);
  const pageSize = 25;
  const chunkedSkus = chunk(uniqSkus, pageSize);
  const idsResponse = (await Promise.all(chunkedSkus.map(async (skus) => {
    return await client.skus.list({
      pageSize,
      filters: { code_in: skus.join(',') },
      fields: ['id', 'code']
    });
  }))).flat();
  // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
  const ids = idsResponse.reduce((ids, sku) => {
    if (sku.id !== undefined && sku.code !== undefined) {
      ids[sku.code] = sku.id;
    }
    return ids;
  }, {});
  log.end();
  return ids;
};
const getSkuIds = pDebounce(_getSkuIds, { wait: 50, maxWait: 100 });
export const getSkuId = memoize(async (sku) => {
  return await getSkuIds([sku]).then((result) => result[sku]);
});
export const getSku = memoize(async (sku) => {
  const id = await getSkuId(sku);
  if (id === undefined) {
    return undefined;
  }
  const client = await createClient(getConfig());
  return (await client.skus.retrieve(id));
});
