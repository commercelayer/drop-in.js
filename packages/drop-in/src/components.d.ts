/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ClAddToCart {
        /**
          * The SKU or bundle code (i.e. the unique identifier of the product or bundle you want to add to the shopping cart).
         */
        "code": string | undefined;
        /**
          * The frequency which generates a [subscription](https://docs.commercelayer.io/core/v/how-tos/placing-orders/subscriptions). The value must be supported by the associated subscription model.
         */
        "frequency": string | undefined;
        /**
          * A custom image URL for the product or bundle that will be added to the cart. If not provided, the image URL will be taken from the item being added.
         */
        "imageUrl": string | undefined;
        /**
          * Indicates whether the code refers to a `sku` or a `bundle`.
          * @default sku
         */
        "kind"?: "sku" | "bundle";
        /**
          * A custom name for the product or bundle that will be added to the cart. If not provided, the name will be taken from the item being added.
         */
        "name": string | undefined;
        /**
          * The number of units of the selected product you want to add to the shopping cart.
          * @default 1
         */
        "quantity": number;
    }
    interface ClAvailability {
        /**
          * The SKU or bundle code (i.e. the unique identifier of the product or bundle whose availability you want to display).
         */
        "code": string | undefined;
        /**
          * Indicates whether the code refers to a `sku` or a `bundle`.  _⚠️ `bundle` is not fully implemented._
          * @default sku
         */
        "kind"?: "sku" | "bundle";
        /**
          * The rule used to determine the information that will be displayed. `cheapest` is the delivery lead time associated with the lower shipping method cost, `fastest` is the delivery lead time associated with the lower average time to delivery.
          * @default "cheapest"
         */
        "rule": "cheapest" | "fastest";
    }
    interface ClAvailabilityInfo {
        /**
          * The type of information to be displayed.
         */
        "type": | "min-days"
    | "max-days"
    | "min-hours"
    | "max-hours"
    | "shipping-method-name"
    | "shipping-method-price"
    | undefined;
    }
    interface ClAvailabilityStatus {
        /**
          * The product availability status. It determines the visibility of the inner message.
         */
        "type": | "available"
    | "available-with-info"
    | "unavailable"
    | undefined;
    }
    interface ClCart {
        /**
          * Indicate whether the minicart is open or not (available _only_ when the `cl-cart` component is used as _minicart_).
          * @default false
         */
        "open": boolean;
        /**
          * If `true` the minicart automatically opens as soon as an item is added to the shopping cart (available _only_ when the `cl-cart` component is used as _minicart_).
          * @default false
         */
        "openOnAdd": boolean;
        /**
          * By default the `cl-cart` is directly displayed in-place. Setting the `type` to `mini` will change the behavior to be a minicart.
         */
        "type": "mini" | undefined;
    }
    interface ClCartCount {
        /**
          * Toggle this switch to hide the counter when the cart is empty instead of showing `0`.
          * @default false
         */
        "hideWhenEmpty": boolean;
    }
    interface ClCartLink {
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target": "_self" | "_blank" | "_parent" | "_top";
    }
    interface ClCheckoutLink {
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target": "_self" | "_blank" | "_parent" | "_top";
    }
    interface ClIdentityInfo {
        /**
          * The field to be displayed.  Valid values are: - `"email"` - `"metadata.*"` (e.g. `"metadata.firstname"`, etc.)
         */
        "field": string;
    }
    interface ClIdentityLink {
        /**
          * Enable a custom reset password link visible on the login form page. When set, a "Forgot password?" link will be shown on the right below the Password field.
         */
        "resetPasswordUrl"?: string;
        /**
          * Your sales channel [scope](https://docs.commercelayer.io/core/authentication#authorization-scopes) (used to restrict the dataset of your application to a market and/or stock location). If specified, it will override the default scope set in the drop-in library configuration. Otherwise, the default scope taken from the drop-in library configuration will be used.
         */
        "scope"?: string;
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target": "_self" | "_blank" | "_parent" | "_top";
        /**
          * The user account access action.
         */
        "type": "login" | "signup" | "logout" | undefined;
    }
    interface ClIdentityStatus {
        /**
          * The user identity status (logged in or not logged in). It determines the visibility of the inner message based on the stored token.
         */
        "type": "guest" | "customer" | undefined;
    }
    interface ClMyAccountLink {
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target": "_self" | "_blank" | "_parent" | "_top";
    }
    interface ClPrice {
        /**
          * The SKU or bundle code (i.e. the unique identifier of the product or bundle whose price you want to display).
         */
        "code": string | undefined;
        /**
          * Indicates whether the code refers to a `sku` or a `bundle`.
          * @default sku
         */
        "kind"?: "sku" | "bundle";
    }
    interface ClPriceAmount {
        /**
          * The type of price amount to be displayed.
          * @default "price"
         */
        "type": "price" | "compare-at";
    }
}
declare global {
    interface HTMLClAddToCartElement extends Components.ClAddToCart, HTMLStencilElement {
    }
    var HTMLClAddToCartElement: {
        prototype: HTMLClAddToCartElement;
        new (): HTMLClAddToCartElement;
    };
    interface HTMLClAvailabilityElement extends Components.ClAvailability, HTMLStencilElement {
    }
    var HTMLClAvailabilityElement: {
        prototype: HTMLClAvailabilityElement;
        new (): HTMLClAvailabilityElement;
    };
    interface HTMLClAvailabilityInfoElement extends Components.ClAvailabilityInfo, HTMLStencilElement {
    }
    var HTMLClAvailabilityInfoElement: {
        prototype: HTMLClAvailabilityInfoElement;
        new (): HTMLClAvailabilityInfoElement;
    };
    interface HTMLClAvailabilityStatusElement extends Components.ClAvailabilityStatus, HTMLStencilElement {
    }
    var HTMLClAvailabilityStatusElement: {
        prototype: HTMLClAvailabilityStatusElement;
        new (): HTMLClAvailabilityStatusElement;
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
    interface HTMLClCheckoutLinkElement extends Components.ClCheckoutLink, HTMLStencilElement {
    }
    var HTMLClCheckoutLinkElement: {
        prototype: HTMLClCheckoutLinkElement;
        new (): HTMLClCheckoutLinkElement;
    };
    interface HTMLClIdentityInfoElement extends Components.ClIdentityInfo, HTMLStencilElement {
    }
    var HTMLClIdentityInfoElement: {
        prototype: HTMLClIdentityInfoElement;
        new (): HTMLClIdentityInfoElement;
    };
    interface HTMLClIdentityLinkElement extends Components.ClIdentityLink, HTMLStencilElement {
    }
    var HTMLClIdentityLinkElement: {
        prototype: HTMLClIdentityLinkElement;
        new (): HTMLClIdentityLinkElement;
    };
    interface HTMLClIdentityStatusElement extends Components.ClIdentityStatus, HTMLStencilElement {
    }
    var HTMLClIdentityStatusElement: {
        prototype: HTMLClIdentityStatusElement;
        new (): HTMLClIdentityStatusElement;
    };
    interface HTMLClMyAccountLinkElement extends Components.ClMyAccountLink, HTMLStencilElement {
    }
    var HTMLClMyAccountLinkElement: {
        prototype: HTMLClMyAccountLinkElement;
        new (): HTMLClMyAccountLinkElement;
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
        "cl-availability": HTMLClAvailabilityElement;
        "cl-availability-info": HTMLClAvailabilityInfoElement;
        "cl-availability-status": HTMLClAvailabilityStatusElement;
        "cl-cart": HTMLClCartElement;
        "cl-cart-count": HTMLClCartCountElement;
        "cl-cart-link": HTMLClCartLinkElement;
        "cl-checkout-link": HTMLClCheckoutLinkElement;
        "cl-identity-info": HTMLClIdentityInfoElement;
        "cl-identity-link": HTMLClIdentityLinkElement;
        "cl-identity-status": HTMLClIdentityStatusElement;
        "cl-my-account-link": HTMLClMyAccountLinkElement;
        "cl-price": HTMLClPriceElement;
        "cl-price-amount": HTMLClPriceAmountElement;
    }
}
declare namespace LocalJSX {
    interface ClAddToCart {
        /**
          * The SKU or bundle code (i.e. the unique identifier of the product or bundle you want to add to the shopping cart).
         */
        "code": string | undefined;
        /**
          * The frequency which generates a [subscription](https://docs.commercelayer.io/core/v/how-tos/placing-orders/subscriptions). The value must be supported by the associated subscription model.
         */
        "frequency"?: string | undefined;
        /**
          * A custom image URL for the product or bundle that will be added to the cart. If not provided, the image URL will be taken from the item being added.
         */
        "imageUrl"?: string | undefined;
        /**
          * Indicates whether the code refers to a `sku` or a `bundle`.
          * @default sku
         */
        "kind"?: "sku" | "bundle";
        /**
          * A custom name for the product or bundle that will be added to the cart. If not provided, the name will be taken from the item being added.
         */
        "name"?: string | undefined;
        /**
          * The number of units of the selected product you want to add to the shopping cart.
          * @default 1
         */
        "quantity"?: number;
    }
    interface ClAvailability {
        /**
          * The SKU or bundle code (i.e. the unique identifier of the product or bundle whose availability you want to display).
         */
        "code": string | undefined;
        /**
          * Indicates whether the code refers to a `sku` or a `bundle`.  _⚠️ `bundle` is not fully implemented._
          * @default sku
         */
        "kind"?: "sku" | "bundle";
        /**
          * The rule used to determine the information that will be displayed. `cheapest` is the delivery lead time associated with the lower shipping method cost, `fastest` is the delivery lead time associated with the lower average time to delivery.
          * @default "cheapest"
         */
        "rule"?: "cheapest" | "fastest";
    }
    interface ClAvailabilityInfo {
        /**
          * The type of information to be displayed.
         */
        "type": | "min-days"
    | "max-days"
    | "min-hours"
    | "max-hours"
    | "shipping-method-name"
    | "shipping-method-price"
    | undefined;
    }
    interface ClAvailabilityStatus {
        /**
          * The product availability status. It determines the visibility of the inner message.
         */
        "type": | "available"
    | "available-with-info"
    | "unavailable"
    | undefined;
    }
    interface ClCart {
        /**
          * Indicate whether the minicart is open or not (available _only_ when the `cl-cart` component is used as _minicart_).
          * @default false
         */
        "open"?: boolean;
        /**
          * If `true` the minicart automatically opens as soon as an item is added to the shopping cart (available _only_ when the `cl-cart` component is used as _minicart_).
          * @default false
         */
        "openOnAdd"?: boolean;
        /**
          * By default the `cl-cart` is directly displayed in-place. Setting the `type` to `mini` will change the behavior to be a minicart.
         */
        "type"?: "mini" | undefined;
    }
    interface ClCartCount {
        /**
          * Toggle this switch to hide the counter when the cart is empty instead of showing `0`.
          * @default false
         */
        "hideWhenEmpty"?: boolean;
    }
    interface ClCartLink {
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target"?: "_self" | "_blank" | "_parent" | "_top";
    }
    interface ClCheckoutLink {
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target"?: "_self" | "_blank" | "_parent" | "_top";
    }
    interface ClIdentityInfo {
        /**
          * The field to be displayed.  Valid values are: - `"email"` - `"metadata.*"` (e.g. `"metadata.firstname"`, etc.)
         */
        "field": string;
    }
    interface ClIdentityLink {
        /**
          * Enable a custom reset password link visible on the login form page. When set, a "Forgot password?" link will be shown on the right below the Password field.
         */
        "resetPasswordUrl"?: string;
        /**
          * Your sales channel [scope](https://docs.commercelayer.io/core/authentication#authorization-scopes) (used to restrict the dataset of your application to a market and/or stock location). If specified, it will override the default scope set in the drop-in library configuration. Otherwise, the default scope taken from the drop-in library configuration will be used.
         */
        "scope"?: string;
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target"?: "_self" | "_blank" | "_parent" | "_top";
        /**
          * The user account access action.
         */
        "type": "login" | "signup" | "logout" | undefined;
    }
    interface ClIdentityStatus {
        /**
          * The user identity status (logged in or not logged in). It determines the visibility of the inner message based on the stored token.
         */
        "type": "guest" | "customer" | undefined;
    }
    interface ClMyAccountLink {
        /**
          * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
          * @default "_self"
         */
        "target"?: "_self" | "_blank" | "_parent" | "_top";
    }
    interface ClPrice {
        /**
          * The SKU or bundle code (i.e. the unique identifier of the product or bundle whose price you want to display).
         */
        "code": string | undefined;
        /**
          * Indicates whether the code refers to a `sku` or a `bundle`.
          * @default sku
         */
        "kind"?: "sku" | "bundle";
    }
    interface ClPriceAmount {
        /**
          * The type of price amount to be displayed.
          * @default "price"
         */
        "type"?: "price" | "compare-at";
    }
    interface IntrinsicElements {
        "cl-add-to-cart": ClAddToCart;
        "cl-availability": ClAvailability;
        "cl-availability-info": ClAvailabilityInfo;
        "cl-availability-status": ClAvailabilityStatus;
        "cl-cart": ClCart;
        "cl-cart-count": ClCartCount;
        "cl-cart-link": ClCartLink;
        "cl-checkout-link": ClCheckoutLink;
        "cl-identity-info": ClIdentityInfo;
        "cl-identity-link": ClIdentityLink;
        "cl-identity-status": ClIdentityStatus;
        "cl-my-account-link": ClMyAccountLink;
        "cl-price": ClPrice;
        "cl-price-amount": ClPriceAmount;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cl-add-to-cart": LocalJSX.ClAddToCart & JSXBase.HTMLAttributes<HTMLClAddToCartElement>;
            "cl-availability": LocalJSX.ClAvailability & JSXBase.HTMLAttributes<HTMLClAvailabilityElement>;
            "cl-availability-info": LocalJSX.ClAvailabilityInfo & JSXBase.HTMLAttributes<HTMLClAvailabilityInfoElement>;
            "cl-availability-status": LocalJSX.ClAvailabilityStatus & JSXBase.HTMLAttributes<HTMLClAvailabilityStatusElement>;
            "cl-cart": LocalJSX.ClCart & JSXBase.HTMLAttributes<HTMLClCartElement>;
            "cl-cart-count": LocalJSX.ClCartCount & JSXBase.HTMLAttributes<HTMLClCartCountElement>;
            "cl-cart-link": LocalJSX.ClCartLink & JSXBase.HTMLAttributes<HTMLClCartLinkElement>;
            "cl-checkout-link": LocalJSX.ClCheckoutLink & JSXBase.HTMLAttributes<HTMLClCheckoutLinkElement>;
            "cl-identity-info": LocalJSX.ClIdentityInfo & JSXBase.HTMLAttributes<HTMLClIdentityInfoElement>;
            "cl-identity-link": LocalJSX.ClIdentityLink & JSXBase.HTMLAttributes<HTMLClIdentityLinkElement>;
            "cl-identity-status": LocalJSX.ClIdentityStatus & JSXBase.HTMLAttributes<HTMLClIdentityStatusElement>;
            "cl-my-account-link": LocalJSX.ClMyAccountLink & JSXBase.HTMLAttributes<HTMLClMyAccountLinkElement>;
            "cl-price": LocalJSX.ClPrice & JSXBase.HTMLAttributes<HTMLClPriceElement>;
            "cl-price-amount": LocalJSX.ClPriceAmount & JSXBase.HTMLAttributes<HTMLClPriceAmountElement>;
        }
    }
}
