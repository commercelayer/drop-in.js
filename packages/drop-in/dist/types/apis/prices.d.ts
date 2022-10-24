import type { Price } from '@commercelayer/sdk';
interface PriceList {
  [sku: string]: Price | undefined;
}
export declare const _getPrices: (skus: string[]) => Promise<PriceList>;
export declare const getPrice: (sku: string) => Promise<Price | undefined>;
export {};
