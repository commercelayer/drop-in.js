import type { Sku } from '@commercelayer/sdk';
export declare const getSkuId: (sku: string) => Promise<string | undefined>;
export declare const getSku: (sku: string) => Promise<Sku | undefined>;
