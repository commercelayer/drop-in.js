import type { Sku } from '#apis/commercelayer/skus';
import { JSX } from '../../stencil-public-runtime';
export declare class ClAvailabilityMessage {
  format: 'days' | 'hours' | undefined;
  message: string | undefined;
  displayMessage: string | undefined;
  skuUpdateHandler(event: CustomEvent<Sku>): void;
  render(): JSX.Element;
}
