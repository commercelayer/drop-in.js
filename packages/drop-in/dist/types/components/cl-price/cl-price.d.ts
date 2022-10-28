import { JSX } from '../../stencil-public-runtime';
export declare class CLPrice {
  host: HTMLElement;
  sku: string | undefined;
  componentWillLoad(): Promise<void>;
  watchPropHandler(newValue: string, _oldValue: string): void;
  private updatePrice;
  render(): JSX.Element;
}
