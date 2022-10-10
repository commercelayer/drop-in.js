import type { Components, JSX } from "../types/components";

interface ClAddToCart extends Components.ClAddToCart, HTMLElement {}
export const ClAddToCart: {
  prototype: ClAddToCart;
  new (): ClAddToCart;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
