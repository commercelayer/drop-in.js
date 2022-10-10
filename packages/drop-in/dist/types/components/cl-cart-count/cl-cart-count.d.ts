import type { Order } from '@commercelayer/sdk';
import { JSX } from '../../stencil-public-runtime';
export declare class ClCartCount {
  count: number | undefined;
  componentWillLoad(): Promise<void>;
  cartUpdateHandler(event: CustomEvent<Order>): void;
  render(): JSX.Element;
}
