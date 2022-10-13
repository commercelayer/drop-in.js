/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface ClAddToCart {
        /**
          * Quantity
         */
        "quantity": number;
        /**
          * Sku code
         */
        "sku": string | undefined;
    }
    interface ClCart {
    }
    interface ClCartCount {
    }
    interface ClCartLink {
        /**
          * Target
         */
        "target": string;
    }
    interface ClPrice {
        /**
          * Sku code
         */
        "sku": string | undefined;
    }
    interface ClPriceAmount {
        "type": 'price' | 'compare-at';
    }
}
declare global {
    interface HTMLClAddToCartElement extends Components.ClAddToCart, HTMLStencilElement {
    }
    var HTMLClAddToCartElement: {
        prototype: HTMLClAddToCartElement;
        new (): HTMLClAddToCartElement;
    };
    interface HTMLClCartElement extends Components.ClCart, HTMLStencilElement {
    }
    var HTMLClCartElement: {
        prototype: HTMLClCartElement;
        new (): HTMLClCartElement;
    };
    interface HTMLClCartCountElement extends Components.ClCartCount, HTMLStencilElement {
    }
    var HTMLClCartCountElement: {
        prototype: HTMLClCartCountElement;
        new (): HTMLClCartCountElement;
    };
    interface HTMLClCartLinkElement extends Components.ClCartLink, HTMLStencilElement {
    }
    var HTMLClCartLinkElement: {
        prototype: HTMLClCartLinkElement;
        new (): HTMLClCartLinkElement;
    };
    interface HTMLClPriceElement extends Components.ClPrice, HTMLStencilElement {
    }
    var HTMLClPriceElement: {
        prototype: HTMLClPriceElement;
        new (): HTMLClPriceElement;
    };
    interface HTMLClPriceAmountElement extends Components.ClPriceAmount, HTMLStencilElement {
    }
    var HTMLClPriceAmountElement: {
        prototype: HTMLClPriceAmountElement;
        new (): HTMLClPriceAmountElement;
    };
    interface HTMLElementTagNameMap {
        "cl-add-to-cart": HTMLClAddToCartElement;
        "cl-cart": HTMLClCartElement;
        "cl-cart-count": HTMLClCartCountElement;
        "cl-cart-link": HTMLClCartLinkElement;
        "cl-price": HTMLClPriceElement;
        "cl-price-amount": HTMLClPriceAmountElement;
    }
}
declare namespace LocalJSX {
    interface ClAddToCart {
        /**
          * Quantity
         */
        "quantity"?: number;
        /**
          * Sku code
         */
        "sku"?: string | undefined;
    }
    interface ClCart {
    }
    interface ClCartCount {
    }
    interface ClCartLink {
        /**
          * Target
         */
        "target"?: string;
    }
    interface ClPrice {
        /**
          * Sku code
         */
        "sku"?: string | undefined;
    }
    interface ClPriceAmount {
        "type"?: 'price' | 'compare-at';
    }
    interface IntrinsicElements {
        "cl-add-to-cart": ClAddToCart;
        "cl-cart": ClCart;
        "cl-cart-count": ClCartCount;
        "cl-cart-link": ClCartLink;
        "cl-price": ClPrice;
        "cl-price-amount": ClPriceAmount;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cl-add-to-cart": LocalJSX.ClAddToCart & JSXBase.HTMLAttributes<HTMLClAddToCartElement>;
            "cl-cart": LocalJSX.ClCart & JSXBase.HTMLAttributes<HTMLClCartElement>;
            "cl-cart-count": LocalJSX.ClCartCount & JSXBase.HTMLAttributes<HTMLClCartCountElement>;
            "cl-cart-link": LocalJSX.ClCartLink & JSXBase.HTMLAttributes<HTMLClCartLinkElement>;
            "cl-price": LocalJSX.ClPrice & JSXBase.HTMLAttributes<HTMLClPriceElement>;
            "cl-price-amount": LocalJSX.ClPriceAmount & JSXBase.HTMLAttributes<HTMLClPriceAmountElement>;
        }
    }
}
