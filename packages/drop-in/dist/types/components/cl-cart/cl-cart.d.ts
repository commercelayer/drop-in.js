import { JSX } from '../../stencil-public-runtime';
export declare class ClCart {
  host: HTMLElement;
  href: string | undefined;
  iframe: HTMLIFrameElement;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  render(): JSX.Element;
}
