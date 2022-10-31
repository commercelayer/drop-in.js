import type { Sku } from '#apis/commercelayer/skus';
import { JSX } from '../../stencil-public-runtime';
export declare class ClAvailabilityStatus {
  type: 'available' | 'unavailable' | undefined;
  available: boolean | undefined;
  skuUpdateHandler(event: CustomEvent<Sku>): void;
  render(): JSX.Element | null;
}
