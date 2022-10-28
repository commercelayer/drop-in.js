import type { Sku } from '@commercelayer/sdk';
import { JSX } from '../../stencil-public-runtime';
export declare class CLAddToCart {
  host: HTMLElement;
  sku: string | undefined;
  quantity: number;
  skuObject: Sku | undefined;
  watchSkuHandler(newValue: string, _oldValue: string): void;
  watchQuantityHandler(newValue: number, _oldValue: number): void;
  componentWillLoad(): Promise<void>;
  handleKeyPress(event: KeyboardEvent): void;
  handleAddItem(): void;
  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold(): boolean;
  render(): JSX.Element;
}
