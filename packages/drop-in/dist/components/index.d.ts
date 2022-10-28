/* DropIn custom elements */
export { CLAddToCart as ClAddToCart } from '../types/components/cl-add-to-cart/cl-add-to-cart';
export { ClAvailability as ClAvailability } from '../types/components/cl-availability/cl-availability';
export { ClAvailabilityStatus as ClAvailabilityStatus } from '../types/components/cl-availability-status/cl-availability-status';
export { ClCart as ClCart } from '../types/components/cl-cart/cl-cart';
export { ClCartCount as ClCartCount } from '../types/components/cl-cart-count/cl-cart-count';
export { CLCartLink as ClCartLink } from '../types/components/cl-cart-link/cl-cart-link';
export { CLPrice as ClPrice } from '../types/components/cl-price/cl-price';
export { CLPriceAmount as ClPriceAmount } from '../types/components/cl-price-amount/cl-price-amount';

/**
 * Used to manually set the base path where assets can be found.
 * If the script is used as "module", it's recommended to use "import.meta.url",
 * such as "setAssetPath(import.meta.url)". Other options include
 * "setAssetPath(document.currentScript.src)", or using a bundler's replace plugin to
 * dynamically set the path at build time, such as "setAssetPath(process.env.ASSET_PATH)".
 * But do note that this configuration depends on how your script is bundled, or lack of
 * bundling, and where your assets can be loaded from. Additionally custom bundling
 * will have to ensure the static assets are copied to its build directory.
 */
export declare const setAssetPath: (path: string) => void;

export interface SetPlatformOptions {
  raf?: (c: FrameRequestCallback) => number;
  ael?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
  rel?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
}
export declare const setPlatformOptions: (opts: SetPlatformOptions) => void;
export * from '../types';
