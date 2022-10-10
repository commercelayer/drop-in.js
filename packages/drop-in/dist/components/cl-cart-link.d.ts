import type { Components, JSX } from "../types/components";

interface ClCartLink extends Components.ClCartLink, HTMLElement {}
export const ClCartLink: {
  prototype: ClCartLink;
  new (): ClCartLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
