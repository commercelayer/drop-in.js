import type { Components, JSX } from "../types/components";

interface ClCart extends Components.ClCart, HTMLElement {}
export const ClCart: {
  prototype: ClCart;
  new (): ClCart;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
