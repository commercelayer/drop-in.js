import type { Components, JSX } from "../types/components";

interface ClPriceAmount extends Components.ClPriceAmount, HTMLElement {}
export const ClPriceAmount: {
  prototype: ClPriceAmount;
  new (): ClPriceAmount;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
