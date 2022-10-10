import type { Components, JSX } from "../types/components";

interface ClCartCount extends Components.ClCartCount, HTMLElement {}
export const ClCartCount: {
  prototype: ClCartCount;
  new (): ClCartCount;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
