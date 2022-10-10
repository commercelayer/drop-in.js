import { JSX } from '../../stencil-public-runtime';
export declare class CLAddToCart {
  host: HTMLElement;
  /**
   * Sku code
   */
  sku: string | undefined;
  /**
   * Quantity
   */
  quantity: number;
  logSku(sku: string | undefined): void;
  logQuantity(quantity: number): void;
  validateSku(sku: string | undefined): sku is string;
  validateQuantity(quantity: number): boolean;
  watchSkuHandler(newValue: string, _oldValue: string): void;
  watchQuantityHandler(newValue: number, _oldValue: number): void;
  componentWillLoad(): void;
  handleKeyPress(event: KeyboardEvent): void;
  handleAddItem(): void;
  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold(): boolean;
  render(): JSX.Element;
}
