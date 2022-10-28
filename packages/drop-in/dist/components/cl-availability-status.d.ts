import type { Components, JSX } from "../types/components";

interface ClAvailabilityStatus extends Components.ClAvailabilityStatus, HTMLElement {}
export const ClAvailabilityStatus: {
  prototype: ClAvailabilityStatus;
  new (): ClAvailabilityStatus;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
