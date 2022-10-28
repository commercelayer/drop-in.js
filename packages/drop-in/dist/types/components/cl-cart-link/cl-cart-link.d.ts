import type { Order } from '@commercelayer/sdk';
import { JSX } from '../../stencil-public-runtime';
export declare class CLCartLink {
  host: HTMLElement;
  target: string;
  href: string | undefined;
  componentWillLoad(): Promise<void>;
  handleClick(event: MouseEvent): Promise<void>;
  cartUpdateHandler(_event: CustomEvent<Order>): Promise<void>;
  render(): JSX.Element;
}
