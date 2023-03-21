import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing'
import {
  waitAndExpectForLineItems,
  getAccessToken,
  getCommerceLayerConfiguration,
  getCartId
} from 'jest.e2e.helpers'

const codes = {
  nonexisting: 'NONEXISTINGSKU',
  available: '5PANECAP000000FFFFFFXXXX',
  noOverselling: 'GMUG11OZFFFFFF000000XXXX',
  noDiscount: 'BACKPACKFFFFFF000000XXXX',
  outOfStock: '5PANECAP9D9CA1FFFFFFXXXX',
  doNotTrack: 'BOTT17OZFFFFFF000000XXXX'
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCodeElements = (code: string) => {
  // eslint-disable-next-line prettier/prettier
  const addToCart = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-add-to-cart[code="${code}"]`)

  // eslint-disable-next-line prettier/prettier
  const getPrice = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-price[code="${code}"]`)

  // eslint-disable-next-line prettier/prettier
  const getPriceAmount = async (page: E2EPage): Promise<E2EElement> => await (await getPrice(page)).find('cl-price-amount[type="price"]')

  // eslint-disable-next-line prettier/prettier
  const getPriceCompareAtAmount = async (page: E2EPage): Promise<E2EElement> => await (await getPrice(page)).find('cl-price-amount[type="compare-at"]')

  // eslint-disable-next-line prettier/prettier
  const getAvailability = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-availability[code="${code}"]`)

  // eslint-disable-next-line prettier/prettier
  const getAvailabilityStatusAvailable = async (page: E2EPage): Promise<E2EElement> => await (await getAvailability(page)).find('cl-availability-status[type="available"]')

  // eslint-disable-next-line prettier/prettier
  const getAvailabilityStatusUnavailable = async (page: E2EPage): Promise<E2EElement> => await (await getAvailability(page)).find('cl-availability-status[type="unavailable"]')

  // eslint-disable-next-line prettier/prettier
  const getAvailabilityInfoMinDays = async (page: E2EPage): Promise<E2EElement> => await (await getAvailability(page)).find('cl-availability-info[type="min-days"]')

  // eslint-disable-next-line prettier/prettier
  const getAvailabilityInfoMaxDays = async (page: E2EPage): Promise<E2EElement> => await (await getAvailability(page)).find('cl-availability-info[type="max-days"]')

  // eslint-disable-next-line prettier/prettier
  const getAvailabilityInfoShippingMethodName = async (page: E2EPage): Promise<E2EElement> => await (await getAvailability(page)).find('cl-availability-info[type="shipping-method-name"]')

  // eslint-disable-next-line prettier/prettier
  const getAvailabilityInfoShippingMethodPrice = async (page: E2EPage): Promise<E2EElement> => await (await getAvailability(page)).find('cl-availability-info[type="shipping-method-price"]')

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
    getAvailabilityInfoShippingMethodPrice
  }
}

const availableElements = getCodeElements(codes.available)
const noDiscountElements = getCodeElements(codes.noDiscount)
const outOfStockElements = getCodeElements(codes.outOfStock)
const doNotTrackElements = getCodeElements(codes.doNotTrack)

// eslint-disable-next-line prettier/prettier
const getCartLink = async (page: E2EPage): Promise<E2EElement> => await page.find('cl-cart-link')

// eslint-disable-next-line prettier/prettier
const getCartCount = async (page: E2EPage): Promise<E2EElement> => await page.find('cl-cart-link cl-cart-count')

// eslint-disable-next-line prettier/prettier
const getCheckoutLink = async (page: E2EPage): Promise<E2EElement> => await page.find('cl-checkout-link')


describe('index.e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      waitUntil: 'networkidle0',
      html: `
        ${getCommerceLayerConfiguration()}
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
              <cl-availability-status type="available">
                <span style="color: green;">Available</span>
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
              <cl-availability-status type="available">
                <span style="color: green;">Available</span>
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
              <cl-availability-status type="available">
                <span style="color: green;">Available</span>
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
              <cl-availability-status type="available">
                <span style="color: green;">Available</span>
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
      `
    })

    await page.waitForChanges()

    expect(await page.find('#container')).toEqualHtml(`
      <div id="container">
        <cl-cart-link target="_blank" cl-hydrated>
          Cart
          <cl-cart-count cl-hydrated></cl-cart-count>
        </cl-cart-link>

        <cl-checkout-link aria-disabled="true" target="_blank" cl-hydrated>
          Checkout
        </cl-checkout-link>

        <div>
          <cl-add-to-cart code="${codes.available}" quantity="1" role="button" tabindex="0" cl-hydrated>Add to cart</cl-add-to-cart>
          <cl-price code="${codes.available}" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability cl-hydrated code="${codes.available}">
            <cl-availability-status cl-hydrated type="available">
              <span style="color: green;">Available</span>
              ready to be shipped in
              <cl-availability-info cl-hydrated type="min-days"></cl-availability-info>
              -
              <cl-availability-info cl-hydrated type="max-days"></cl-availability-info>
              days with
              <cl-availability-info cl-hydrated type="shipping-method-name"></cl-availability-info>
              (<cl-availability-info cl-hydrated type="shipping-method-price"></cl-availability-info>)
            </cl-availability-status>
            <cl-availability-status aria-disabled="true" cl-hydrated type="unavailable">Out Of Stock</cl-availability-status>
          </cl-availability>
        </div>

        <div>
          <cl-add-to-cart code="${codes.noDiscount}" quantity="5" role="button" tabindex="0" cl-hydrated>Add to cart</cl-add-to-cart>
          <cl-price code="${codes.noDiscount}" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability cl-hydrated code="${codes.noDiscount}">
            <cl-availability-status cl-hydrated type="available">
              <span style="color: green;">Available</span>
              ready to be shipped in
              <cl-availability-info cl-hydrated type="min-days"></cl-availability-info>
              -
              <cl-availability-info cl-hydrated type="max-days"></cl-availability-info>
              days with
              <cl-availability-info cl-hydrated type="shipping-method-name"></cl-availability-info>
              (<cl-availability-info cl-hydrated type="shipping-method-price"></cl-availability-info>)
            </cl-availability-status>
            <cl-availability-status aria-disabled="true" cl-hydrated type="unavailable">Out Of Stock</cl-availability-status>
          </cl-availability>
        </div>

        <div>
          <cl-add-to-cart aria-disabled="true" code="${codes.outOfStock}" quantity="1" role="button" tabindex="0" cl-hydrated>Add to cart</cl-add-to-cart>
          <cl-price code="${codes.outOfStock}" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability cl-hydrated code="${codes.outOfStock}">
            <cl-availability-status aria-disabled="true" cl-hydrated type="available">
              <span style="color: green;">Available</span>
              ready to be shipped in
              <cl-availability-info cl-hydrated type="min-days"></cl-availability-info>
              -
              <cl-availability-info cl-hydrated type="max-days"></cl-availability-info>
              days with
              <cl-availability-info cl-hydrated type="shipping-method-name"></cl-availability-info>
              (<cl-availability-info cl-hydrated type="shipping-method-price"></cl-availability-info>)
            </cl-availability-status>
            <cl-availability-status cl-hydrated type="unavailable">Out Of Stock</cl-availability-status>
          </cl-availability>
        </div>

        <div>
          <cl-add-to-cart code="${codes.doNotTrack}" quantity="9999" role="button" tabindex="0" cl-hydrated>Add to cart</cl-add-to-cart>
          <cl-price code="${codes.doNotTrack}" cl-hydrated>
            <cl-price-amount type="price" cl-hydrated></cl-price-amount>
            <cl-price-amount type="compare-at" cl-hydrated></cl-price-amount>
          </cl-price>
          <cl-availability cl-hydrated code="${codes.doNotTrack}">
            <cl-availability-status cl-hydrated type="available">
              <span style="color: green;">Available</span>
              ready to be shipped in
              <cl-availability-info cl-hydrated type="min-days"></cl-availability-info>
              -
              <cl-availability-info cl-hydrated type="max-days"></cl-availability-info>
              days with
              <cl-availability-info cl-hydrated type="shipping-method-name"></cl-availability-info>
              (<cl-availability-info cl-hydrated type="shipping-method-price"></cl-availability-info>)
            </cl-availability-status>
            <cl-availability-status aria-disabled="true" cl-hydrated type="unavailable">Out Of Stock</cl-availability-status>
          </cl-availability>
        </div>
      </div>
    `)

    /**
     * EXPECTATIONS FOR "AVAILABLE" PRODUCT
     */

    expect(await availableElements.getPriceAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="price">
        <mock:shadow-root>
          $31.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await availableElements.getPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            $39.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await availableElements.getAvailabilityInfoMinDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="min-days">
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await availableElements.getAvailabilityInfoMaxDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="max-days">
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await availableElements.getAvailabilityInfoShippingMethodName(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-name">
        <mock:shadow-root>
          Standard Shipping
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await availableElements.getAvailabilityInfoShippingMethodPrice(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-price">
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "NO DISCOUNT" PRODUCT
     */

    expect(await noDiscountElements.getPriceAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="price">
        <mock:shadow-root>
          $110.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await noDiscountElements.getPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="compare-at">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await noDiscountElements.getAvailabilityInfoMinDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="min-days">
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await noDiscountElements.getAvailabilityInfoMaxDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="max-days">
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await noDiscountElements.getAvailabilityInfoShippingMethodName(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-name">
        <mock:shadow-root>
          Standard Shipping
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      await noDiscountElements.getAvailabilityInfoShippingMethodPrice(page)
    ).toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-price">
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "OUT OF STOCK" PRODUCT
     */

    expect(await outOfStockElements.getPriceAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="price">
        <mock:shadow-root>
          $31.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await outOfStockElements.getPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            $39.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await outOfStockElements.getAvailabilityInfoMinDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="min-days">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await outOfStockElements.getAvailabilityInfoMaxDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="max-days">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await outOfStockElements.getAvailabilityInfoShippingMethodName(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-name">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      await outOfStockElements.getAvailabilityInfoShippingMethodPrice(page)
    ).toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-price">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "DO NOT TRACK" PRODUCT
     */

    expect(await doNotTrackElements.getPriceAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="price">
        <mock:shadow-root>
          $40.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await doNotTrackElements.getPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount cl-hydrated type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            $49.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await doNotTrackElements.getAvailabilityInfoMinDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="min-days">
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await doNotTrackElements.getAvailabilityInfoMaxDays(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="max-days">
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await doNotTrackElements.getAvailabilityInfoShippingMethodName(page))
      .toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-name">
        <mock:shadow-root>
          Standard Shipping
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      await doNotTrackElements.getAvailabilityInfoShippingMethodPrice(page)
    ).toEqualHtml(`
      <cl-availability-info cl-hydrated type="shipping-method-price">
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * ADD TO CART
     */

    expect(await getCartCount(page)).toEqualHtml(`
      <cl-cart-count cl-hydrated>
        <mock:shadow-root>0</mock:shadow-root>
      </cl-cart-count>
    `)

    const accessToken = (await getAccessToken(page)) ?? 'null'

    expect(await getCartLink(page)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count cl-hydrated></cl-cart-count>
      </cl-cart-link>
    `)

    expect(await getCheckoutLink(page)).toEqualHtml(`
      <cl-checkout-link aria-disabled="true" target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a part="a" target="_blank">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Checkout
      </cl-checkout-link>
    `)

    /**
     * ADDING "OUT OF STOCK" TO CART
     */

    await (await outOfStockElements.addToCart(page)).click()

    expect(await getCartLink(page)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count cl-hydrated></cl-cart-count>
      </cl-cart-link>
    `)

    expect(await getCheckoutLink(page)).toEqualHtml(`
      <cl-checkout-link aria-disabled="true" target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a part="a" target="_blank">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Checkout
      </cl-checkout-link>
    `)

    /**
     * ADDING "AVAILABLE" TO CART
     */

    await (await availableElements.addToCart(page)).click()

    await waitAndExpectForLineItems(page, {
      code: codes.available,
      quantity: 1
    })

    await page.waitForNetworkIdle()

    const cartId = (await getCartId(page)) ?? 'null'
    expect(await getCartLink(page)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count cl-hydrated quantity="1"></cl-cart-count>
      </cl-cart-link>
    `)

    expect(await getCartCount(page)).toEqualHtml(`
      <cl-cart-count quantity="1" cl-hydrated>
        <mock:shadow-root>
          1
        </mock:shadow-root>
      </cl-cart-count>
    `)

    expect(await getCheckoutLink(page)).toEqualHtml(`
      <cl-checkout-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/checkout/${cartId}?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Checkout
      </cl-checkout-link>
    `)

    /**
     * ADDING "NO DISCOUNT" TO CART
     */

    await (await noDiscountElements.addToCart(page)).click()

    await waitAndExpectForLineItems(page, {
      code: codes.noDiscount,
      quantity: 5
    })

    await page.waitForNetworkIdle()

    expect(await getCartLink(page)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count cl-hydrated quantity="6"></cl-cart-count>
      </cl-cart-link>
    `)

    expect(await getCartCount(page)).toEqualHtml(`
      <cl-cart-count quantity="6" cl-hydrated>
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-cart-count>
    `)

    expect(await getCheckoutLink(page)).toEqualHtml(`
      <cl-checkout-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/checkout/${cartId}?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Checkout
      </cl-checkout-link>
    `)

    /**
     * ADDING "DO NOT TRACK" TO CART
     */

    await (await doNotTrackElements.addToCart(page)).click()

    await waitAndExpectForLineItems(page, {
      code: codes.doNotTrack,
      quantity: 9999
    })

    await page.waitForNetworkIdle()

    expect(await getCartLink(page)).toEqualHtml(`
      <cl-cart-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count cl-hydrated quantity="10005"></cl-cart-count>
      </cl-cart-link>
    `)

    expect(await getCartCount(page)).toEqualHtml(`
      <cl-cart-count quantity="10005" cl-hydrated>
        <mock:shadow-root>
          10005
        </mock:shadow-root>
      </cl-cart-count>
    `)

    expect(await getCheckoutLink(page)).toEqualHtml(`
      <cl-checkout-link target="_blank" cl-hydrated>
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/checkout/${cartId}?accessToken=${accessToken}"
            part="a"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Checkout
      </cl-checkout-link>
    `)
  })
})
