import type { Order } from '@commercelayer/sdk';
export declare function isValidUrl(url: string): boolean;
/**
 * Get the Hosted Cart url.
 * @param forceCartToExist When true it will create an empty cart if not existing before.
 * @returns Returns the Hosted Cart url.
 */
export declare function getCartUrl(forceCartToExist?: boolean): Promise<string>;
export declare function _getCart(): Promise<Order | null>;
export declare const getCart: () => Promise<Order | null>;
export declare function triggerCartUpdate(order: Order | null): Promise<void>;
export declare function addItem(sku: string, quantity: number): Promise<void>;
