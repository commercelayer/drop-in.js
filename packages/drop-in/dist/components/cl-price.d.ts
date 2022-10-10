import type { Components, JSX } from "../types/components";

interface ClPrice extends Components.ClPrice, HTMLElement {}
export const ClPrice: {
  prototype: ClPrice;
  new (): ClPrice;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
