import { render } from "@stencil/vitest"
import { getAccessToken, getCartId } from "@/testing/e2e-helpers"
import { waitFor } from "@/testing/spec-helpers"

const codes = {
  nonexisting: "NONEXISTINGSKU",
  available: "5PANECAP000000FFFFFFXXXX",
  noOverselling: "GMUG11OZFFFFFF000000XXXX",
  noDiscount: "BACKPACKFFFFFF000000XXXX",
  outOfStock: "5PANECAP9D9CA1FFFFFFXXXX",
  doNotTrack: "BOTT17OZFFFFFF000000XXXX",
  digitalProduct: "EBOOKECOMPLAYBOOKED1XXXX",
  subscription: "POLOMXXX000000FFFFFFMXXX",
  bundleAvailable: "CLGETTINGSTARTED",
  bundleOutOfStock: "CLOUTOFSTOCK",
}

const getCodeElements = (code: string) => {
  const addToCart = (root: Element): HTMLElement | null =>
    root.querySelector<HTMLElement>(`cl-add-to-cart[code="${code}"]`)

  const getPrice = (root: Element): HTMLElement | null =>
    root.querySelector<HTMLElement>(`cl-price[code="${code}"]`)

  const getPriceAmount = (root: Element): HTMLElement | null =>
    getPrice(root)?.querySelector<HTMLElement>(
      'cl-price-amount[type="price"]',
    ) ?? null

  const getPriceCompareAtAmount = (root: Element): HTMLElement | null =>
    getPrice(root)?.querySelector<HTMLElement>(
      'cl-price-amount[type="compare-at"]',
    ) ?? null

  const getAvailability = (root: Element): HTMLElement | null =>
    root.querySelector<HTMLElement>(`cl-availability[code="${code}"]`)

  const getAvailabilityStatusAvailable = (root: Element): HTMLElement | null =>
    getAvailability(root)?.querySelector<HTMLElement>(
      'cl-availability-status[type="available"]',
    ) ?? null

  const getAvailabilityStatusUnavailable = (
    root: Element,
  ): HTMLElement | null =>
    getAvailability(root)?.querySelector<HTMLElement>(
      'cl-availability-status[type="unavailable"]',
    ) ?? null

  const getAvailabilityInfoMinDays = (root: Element): HTMLElement | null =>
    getAvailability(root)?.querySelector<HTMLElement>(
      'cl-availability-info[type="min-days"]',
    ) ?? null

  const getAvailabilityInfoMaxDays = (root: Element): HTMLElement | null =>
    getAvailability(root)?.querySelector<HTMLElement>(
      'cl-availability-info[type="max-days"]',
    ) ?? null

  const getAvailabilityInfoShippingMethodName = (
    root: Element,
  ): HTMLElement | null =>
    getAvailability(root)?.querySelector<HTMLElement>(
      'cl-availability-info[type="shipping-method-name"]',
    ) ?? null

  const getAvailabilityInfoShippingMethodPrice = (
    root: Element,
  ): HTMLElement | null =>
    getAvailability(root)?.querySelector<HTMLElement>(
      'cl-availability-info[type="shipping-method-price"]',
    ) ?? null

  return {
    addToCart,
    getPrice,
    getPriceAmount,
    getPriceCompareAtAmount,
    getAvailability,
    getAvailabilityStatusAvailable,
    getAvailabilityStatusUnavailable,
    getAvailabilityInfoMinDays,
    getAvailabilityInfoMaxDays,
    getAvailabilityInfoShippingMethodName,
    getAvailabilityInfoShippingMethodPrice,
  }
}

const availableElements = getCodeElements(codes.available)
const noDiscountElements = getCodeElements(codes.noDiscount)
const outOfStockElements = getCodeElements(codes.outOfStock)
const doNotTrackElements = getCodeElements(codes.doNotTrack)
const digitalProductElements = getCodeElements(codes.digitalProduct)
const subscriptionElements = getCodeElements(codes.subscription)
const bundleAvailableElements = getCodeElements(codes.bundleAvailable)
const bundleOutOfStockElements = getCodeElements(codes.bundleOutOfStock)

const getCartLink = (root: Element): HTMLElement | null =>
  root.querySelector<HTMLElement>("cl-cart-link")

const getCartCount = (root: Element): HTMLElement | null =>
  root.querySelector<HTMLElement>("cl-cart-link cl-cart-count")

const getCheckoutLink = (root: Element): HTMLElement | null =>
  root.querySelector<HTMLElement>("cl-checkout-link")

describe("index.e2e", () => {
  it("renders", async () => {
    ;(window as any).commercelayerConfig = {
      clientId: "kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8",
      scope: "market:code:usa",
    }

    const { root, waitForChanges } = await render(`
        <div id="container">
          <cl-cart-link target="_blank">
            Cart
            <cl-cart-count></cl-cart-count>
          </cl-cart-link>

          <cl-checkout-link target="_blank">
            Checkout
          </cl-checkout-link>

          <div>
            <cl-add-to-cart code="${
              codes.available
            }">Add to cart</cl-add-to-cart>
            <cl-price code="${codes.available}">
              <cl-price-amount></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability code="${codes.available}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>

          <div>
            <cl-add-to-cart
              code="${codes.noDiscount}"
              quantity="5"
            >Add to cart</cl-add-to-cart>
            <cl-price code="${codes.noDiscount}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability code="${codes.noDiscount}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>

          <div>
            <cl-add-to-cart
              code="${codes.outOfStock}">Add to cart</cl-add-to-cart>
            <cl-price code="${codes.outOfStock}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability code="${codes.outOfStock}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>

          <div>
            <cl-add-to-cart
              code="${codes.doNotTrack}"
              quantity="9999"
            >Add to cart</cl-add-to-cart>
            <cl-price code="${codes.doNotTrack}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability code="${codes.doNotTrack}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>

          <div>
            <cl-add-to-cart
              code="${codes.digitalProduct}">Add to cart</cl-add-to-cart>
            <cl-price code="${codes.digitalProduct}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability code="${codes.digitalProduct}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>

          <div>
            <cl-add-to-cart
              code="${codes.subscription}"
              quantity="1"
              frequency="three-month"
            >Add to cart</cl-add-to-cart>
            <cl-price code="${codes.subscription}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability code="${codes.subscription}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>

          <div>
            <cl-add-to-cart
              kind="bundle"
              code="${codes.bundleAvailable}"
              quantity="1"
            >Add to cart</cl-add-to-cart>
            <cl-price kind="bundle" code="${codes.bundleAvailable}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability kind="bundle" code="${codes.bundleAvailable}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>

          <div>
            <cl-add-to-cart
              kind="bundle"
              code="${codes.bundleOutOfStock}"
              quantity="1"
            >Add to cart</cl-add-to-cart>
            <cl-price kind="bundle" code="${codes.bundleOutOfStock}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability kind="bundle" code="${codes.bundleOutOfStock}">
              <cl-availability-status type="available" style="color: green;">Available<br /></cl-availability-status>
              <cl-availability-status type="available-with-info">
                ready to be shipped in
                <cl-availability-info type="min-days"></cl-availability-info>
                -
                <cl-availability-info type="max-days"></cl-availability-info>
                days with
                <cl-availability-info type="shipping-method-name"></cl-availability-info>
                (<cl-availability-info type="shipping-method-price"></cl-availability-info>)
              </cl-availability-status>
              <cl-availability-status type="unavailable">Out Of Stock</cl-availability-status>
            </cl-availability>
          </div>
        </div>
      `)

    await waitForChanges()

    const accessToken = getAccessToken()?.accessToken ?? "null"

    // This first, large assertion checks the light-DOM structure only
    // (attributes, slotting, hydration) — the shadow content of each
    // individual sub-element (price, availability info, etc.) is verified
    // precisely by the many focused assertions below. Puppeteer/jest's
    // `toEqualHtml` for a page-level `find()` never serialized nested shadow
    // roots either; `toEqualLightHtml` is the vitest equivalent for that.
    expect(root).toEqualLightHtml(`
      <div id="container">
        <cl-cart-link target="_blank" cl-hydrated>
          <a target="_blank" href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}">
            Cart
            <cl-cart-count cl-hydrated></cl-cart-count>
          </a>
        </cl-cart-link>
        <cl-checkout-link target="_blank" aria-disabled="true" cl-hydrated>
          <a target="_blank">
            Checkout
          </a>
        </cl-checkout-link>
        <div>
          <cl-add-to-cart code="${codes.available}" role="button" tabindex="0" kind="sku" quantity="1" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price code="${codes.available}" kind="sku" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability code="${codes.available}" kind="sku" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" aria-disabled="true" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
        <div>
          <cl-add-to-cart code="${codes.noDiscount}" quantity="5" role="button" tabindex="0" kind="sku" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price code="${codes.noDiscount}" kind="sku" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability code="${codes.noDiscount}" kind="sku" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" aria-disabled="true" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
        <div>
          <cl-add-to-cart code="${codes.outOfStock}" role="button" tabindex="0" aria-disabled="true" kind="sku" quantity="1" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price code="${codes.outOfStock}" kind="sku" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability code="${codes.outOfStock}" kind="sku" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" aria-disabled="true" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" aria-disabled="true" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
        <div>
          <cl-add-to-cart code="${codes.doNotTrack}" quantity="9999" role="button" tabindex="0" kind="sku" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price code="${codes.doNotTrack}" kind="sku" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability code="${codes.doNotTrack}" kind="sku" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" aria-disabled="true" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
        <div>
          <cl-add-to-cart code="${codes.digitalProduct}" role="button" tabindex="0" kind="sku" quantity="1" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price code="${codes.digitalProduct}" kind="sku" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability code="${codes.digitalProduct}" kind="sku" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" aria-disabled="true" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" aria-disabled="true" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
        <div>
          <cl-add-to-cart code="${codes.subscription}" quantity="1" frequency="three-month" role="button" tabindex="0" kind="sku" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price code="${codes.subscription}" kind="sku" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability code="${codes.subscription}" kind="sku" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" aria-disabled="true" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
        <div>
          <cl-add-to-cart kind="bundle" code="${codes.bundleAvailable}" quantity="1" role="button" tabindex="0" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price kind="bundle" code="${codes.bundleAvailable}" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability kind="bundle" code="${codes.bundleAvailable}" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" aria-disabled="true" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" aria-disabled="true" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
        <div>
          <cl-add-to-cart kind="bundle" code="${codes.bundleOutOfStock}" quantity="1" role="button" tabindex="0" aria-disabled="true" cl-hydrated>
            Add to cart
          </cl-add-to-cart>
          <cl-price kind="bundle" code="${codes.bundleOutOfStock}" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability kind="bundle" code="${codes.bundleOutOfStock}" rule="cheapest" cl-hydrated>
            <cl-availability-status type="available" style="color: green;" aria-disabled="true" cl-hydrated>
              Available
              <br>
            </cl-availability-status>
            <cl-availability-status type="available-with-info" aria-disabled="true" cl-hydrated>
              ready to be shipped in
              <cl-availability-info type="min-days" cl-hydrated></cl-availability-info>
              -
              <cl-availability-info type="max-days" cl-hydrated></cl-availability-info>
              days with
              <cl-availability-info type="shipping-method-name" cl-hydrated></cl-availability-info>
              (
              <cl-availability-info type="shipping-method-price" cl-hydrated></cl-availability-info>
              )
            </cl-availability-status>
            <cl-availability-status type="unavailable" cl-hydrated>
              Out Of Stock
            </cl-availability-status>
          </cl-availability>
        </div>
      </div>
    `)

    /**
     * EXPECTATIONS FOR "AVAILABLE" PRODUCT
     */

    expect(availableElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $31.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(availableElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root>
          <s part="strikethrough">
            $39.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(availableElements.getAvailabilityInfoMinDays(root)).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(availableElements.getAvailabilityInfoMaxDays(root)).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      availableElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root>
          Standard Shipping
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      availableElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "NO DISCOUNT" PRODUCT
     */

    expect(noDiscountElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $110.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(noDiscountElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    expect(noDiscountElements.getAvailabilityInfoMinDays(root)).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(noDiscountElements.getAvailabilityInfoMaxDays(root)).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      noDiscountElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root>
          Standard Shipping
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      noDiscountElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "OUT OF STOCK" PRODUCT
     */

    expect(outOfStockElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $31.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(outOfStockElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root>
          <s part="strikethrough">
            $39.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(outOfStockElements.getAvailabilityInfoMinDays(root)).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(outOfStockElements.getAvailabilityInfoMaxDays(root)).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      outOfStockElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      outOfStockElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "DO NOT TRACK" PRODUCT
     */

    expect(doNotTrackElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $40.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(doNotTrackElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root>
          <s part="strikethrough">
            $49.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(doNotTrackElements.getAvailabilityInfoMinDays(root)).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(doNotTrackElements.getAvailabilityInfoMaxDays(root)).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      doNotTrackElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root>
          Standard Shipping
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      doNotTrackElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "DIGITAL PRODUCT" PRODUCT
     */

    expect(digitalProductElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $31.10
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(digitalProductElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root>
          <s part="strikethrough">
            $35.50
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(
      digitalProductElements.getAvailabilityInfoMinDays(root),
    ).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      digitalProductElements.getAvailabilityInfoMaxDays(root),
    ).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      digitalProductElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      digitalProductElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "SUBSCRIPTION" PRODUCT
     */

    expect(subscriptionElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $107.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(subscriptionElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root>
          <s part="strikethrough">
            $119.90
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(subscriptionElements.getAvailabilityInfoMinDays(root)).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(subscriptionElements.getAvailabilityInfoMaxDays(root)).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      subscriptionElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root>
          Standard Shipping
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      subscriptionElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "AVAILABLE BUNDLE" PRODUCT
     */

    expect(bundleAvailableElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $100.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(bundleAvailableElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root>
          <s part="strikethrough">
            $405.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(
      bundleAvailableElements.getAvailabilityInfoMinDays(root),
    ).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      bundleAvailableElements.getAvailabilityInfoMaxDays(root),
    ).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      bundleAvailableElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      bundleAvailableElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "AVAILABLE OUT-OF-STOCK" PRODUCT
     */

    expect(bundleOutOfStockElements.getPriceAmount(root)).toEqualHtml(`
      <cl-price-amount type="price" cl-hydrated>
        <mock:shadow-root>
          $85.30
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(bundleOutOfStockElements.getPriceCompareAtAmount(root)).toEqualHtml(`
      <cl-price-amount type="compare-at" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    expect(
      bundleOutOfStockElements.getAvailabilityInfoMinDays(root),
    ).toEqualHtml(`
      <cl-availability-info type="min-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      bundleOutOfStockElements.getAvailabilityInfoMaxDays(root),
    ).toEqualHtml(`
      <cl-availability-info type="max-days" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      bundleOutOfStockElements.getAvailabilityInfoShippingMethodName(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-name" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      bundleOutOfStockElements.getAvailabilityInfoShippingMethodPrice(root),
    ).toEqualHtml(`
      <cl-availability-info type="shipping-method-price" cl-hydrated>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * ADD TO CART
     */

    expect(getCartCount(root)).toEqualHtml(`
      <cl-cart-count cl-hydrated>
        <mock:shadow-root>
          0
        </mock:shadow-root>
      </cl-cart-count>
    `)

    expect(getCartLink(root)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}">
          Cart
          <cl-cart-count cl-hydrated>
            <mock:shadow-root>
              0
            </mock:shadow-root>
          </cl-cart-count>
        </a>
      </cl-cart-link>
    `)

    expect(getCheckoutLink(root)).toEqualHtml(`
      <cl-checkout-link target="_blank" aria-disabled="true" cl-hydrated>
        <a target="_blank">
          Checkout
        </a>
      </cl-checkout-link>
    `)

    /**
     * ADDING "OUT OF STOCK" TO CART
     */

    outOfStockElements.addToCart(root)?.click()

    expect(getCartLink(root)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}">
          Cart
          <cl-cart-count cl-hydrated>
            <mock:shadow-root>
              0
            </mock:shadow-root>
          </cl-cart-count>
        </a>
      </cl-cart-link>
    `)

    expect(getCheckoutLink(root)).toEqualHtml(`
      <cl-checkout-link target="_blank" aria-disabled="true" cl-hydrated>
        <a target="_blank">
          Checkout
        </a>
      </cl-checkout-link>
    `)

    /**
     * ADDING "AVAILABLE" TO CART
     */

    expect(availableElements.addToCart(root)).not.toHaveAttribute(
      "aria-disabled",
    )
    expect(availableElements.addToCart(root)).not.toHaveAttribute("aria-busy")

    availableElements.addToCart(root)?.click()

    await waitFor(
      waitForChanges,
      () =>
        availableElements.addToCart(root)?.hasAttribute("aria-busy") ?? false,
    )

    expect(availableElements.addToCart(root)).toHaveAttribute("aria-disabled")
    expect(availableElements.addToCart(root)).toHaveAttribute("aria-busy")

    // Waits for the real add-to-cart request against the Commerce Layer
    // sandbox to finish (the button's own "aria-busy" state, set by the
    // component while the request is in flight, doubles as the completion
    // signal) — this replaces network-response interception, since no
    // Puppeteer/Playwright `page` object is available inside a Vitest
    // browser-mode test.
    await waitFor(
      waitForChanges,
      () => !availableElements.addToCart(root)?.hasAttribute("aria-busy"),
    )

    expect(availableElements.addToCart(root)).not.toHaveAttribute(
      "aria-disabled",
    )
    expect(availableElements.addToCart(root)).not.toHaveAttribute("aria-busy")

    const cartId = getCartId() ?? "null"
    expect(getCartLink(root)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}">
          Cart
          <cl-cart-count cl-hydrated quantity="1">
            <mock:shadow-root>
              1
            </mock:shadow-root>
          </cl-cart-count>
        </a>
      </cl-cart-link>
    `)

    expect(getCartCount(root)).toEqualHtml(`
      <cl-cart-count cl-hydrated quantity="1">
        <mock:shadow-root>
          1
        </mock:shadow-root>
      </cl-cart-count>
    `)

    expect(getCheckoutLink(root)).toEqualHtml(`
      <cl-checkout-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/checkout/${cartId}?accessToken=${accessToken}">
          Checkout
        </a>
      </cl-checkout-link>
    `)

    /**
     * ADDING "NO DISCOUNT" TO CART
     */

    noDiscountElements.addToCart(root)?.click()

    await waitFor(
      waitForChanges,
      () => !noDiscountElements.addToCart(root)?.hasAttribute("aria-busy"),
    )

    expect(getCartLink(root)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}">
          Cart
          <cl-cart-count cl-hydrated quantity="6">
            <mock:shadow-root>
              6
            </mock:shadow-root>
          </cl-cart-count>
        </a>
      </cl-cart-link>
    `)

    expect(getCartCount(root)).toEqualHtml(`
      <cl-cart-count cl-hydrated quantity="6">
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-cart-count>
    `)

    expect(getCheckoutLink(root)).toEqualHtml(`
      <cl-checkout-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/checkout/${cartId}?accessToken=${accessToken}">
          Checkout
        </a>
      </cl-checkout-link>
    `)

    /**
     * ADDING "DO NOT TRACK" TO CART
     */

    doNotTrackElements.addToCart(root)?.click()

    await waitFor(
      waitForChanges,
      () => !doNotTrackElements.addToCart(root)?.hasAttribute("aria-busy"),
    )

    expect(getCartLink(root)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}">
          Cart
          <cl-cart-count cl-hydrated quantity="10005">
            <mock:shadow-root>
              10005
            </mock:shadow-root>
          </cl-cart-count>
        </a>
      </cl-cart-link>
    `)

    expect(getCartCount(root)).toEqualHtml(`
      <cl-cart-count cl-hydrated quantity="10005">
        <mock:shadow-root>
          10005
        </mock:shadow-root>
      </cl-cart-count>
    `)

    expect(getCheckoutLink(root)).toEqualHtml(`
      <cl-checkout-link target="_blank" cl-hydrated>
        <a target="_blank" href="https://drop-in-js.commercelayer.app/checkout/${cartId}?accessToken=${accessToken}">
          Checkout
        </a>
      </cl-checkout-link>
    `)
  })
})
