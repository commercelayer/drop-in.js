import { JSX } from '../../stencil-public-runtime';
export declare class ClAvailability {
  host: HTMLElement;
  sku: string | undefined;
  componentWillLoad(): Promise<void>;
  watchPropHandler(newValue: string, _oldValue: string): void;
  private updateAvailability;
  render(): JSX.Element;
}
