import type { Components, JSX } from "../types/components";

interface ClAvailability extends Components.ClAvailability, HTMLElement {}
export const ClAvailability: {
  prototype: ClAvailability;
  new (): ClAvailability;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
