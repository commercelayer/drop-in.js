import { JSX } from '../../stencil-public-runtime';
export declare class CLCartLink {
  host: HTMLElement;
  /**
   * Target
   */
  target: string;
  href: string | undefined;
  componentWillLoad(): Promise<void>;
  handleClick(event: MouseEvent): Promise<void>;
  render(): JSX.Element;
}
