import type { Price } from '@commercelayer/sdk';
import { JSX } from '../../stencil-public-runtime';
export declare class CLPrice {
  /**
   * Sku code
   */
  sku: string | undefined;
  host: HTMLElement;
  logSku(sku: string | undefined): void;
  validateSku(sku: string | undefined): sku is string;
  componentWillLoad(): void;
  watchPropHandler(newValue: string, _oldValue: string): void;
  priceUpdateHandler({ type, detail }: CustomEvent<Price>): void;
  render(): JSX.Element;
}
