import type { Price } from '@commercelayer/sdk';
import { JSX } from '../../stencil-public-runtime';
export declare class CLPriceAmount {
  type: 'price' | 'compare-at';
  price: string | undefined;
  priceUpdateHandler(event: CustomEvent<Price>): void;
  render(): JSX.Element;
}
