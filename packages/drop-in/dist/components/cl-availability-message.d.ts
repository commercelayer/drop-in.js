import type { Components, JSX } from "../types/components";

interface ClAvailabilityMessage extends Components.ClAvailabilityMessage, HTMLElement {}
export const ClAvailabilityMessage: {
  prototype: ClAvailabilityMessage;
  new (): ClAvailabilityMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
