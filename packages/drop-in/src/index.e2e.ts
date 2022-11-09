import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing'
import {
  waitAndExpectForLineItems,
  getAccessToken,
  getCommerceLayerConfiguration,
  getCartId
} from 'jest.e2e.helpers'

const skus = {
  outOfStock: '5PANECAP9D9CA1FFFFFFXXXX',
  nonexisting: 'NONEXISTINGSKU',
  cap: '5PANECAP000000FFFFFFXXXX',
  backpack: 'BACKPACKFFFFFF000000XXXX'
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getSkuElements = (sku: string) => {
  // eslint-disable-next-line prettier/prettier
  const addToCart = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-add-to-cart[sku="${sku}"]`)

  // eslint-disable-next-line prettier/prettier
  const getPrice = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-price[sku="${sku}"]`)

  // eslint-disable-next-line prettier/prettier
  const getPriceAmount = async (page: E2EPage): Promise<E2EElement> => await (await getPrice(page)).find('cl-price-amount[type="price"]')

  // eslint-disable-next-line prettier/prettier
  const getPriceCompareAtAmount = async (page: E2EPage): Promise<E2EElement> => await (await getPrice(page)).find('cl-price-amount[type="compare-at"]')

  // eslint-disable-next-line prettier/prettier
  const getAvailability = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-availability[sku="${sku}"]`)

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

const capElements = getSkuElements(skus.cap)
const backpackElements = getSkuElements(skus.backpack)
const outOfStockElements = getSkuElements(skus.outOfStock)

// eslint-disable-next-line prettier/prettier
const getCartLink = async (page: E2EPage): Promise<E2EElement> => await page.find('cl-cart-link')

// eslint-disable-next-line prettier/prettier
const getCartCount = async (page: E2EPage): Promise<E2EElement> => await page.find('cl-cart-link cl-cart-count')


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

          <div>
            <cl-add-to-cart sku="${skus.cap}">Add to cart</cl-add-to-cart>
            <cl-price sku="${skus.cap}">
              <cl-price-amount></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability sku="${skus.cap}">
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
              sku="${skus.backpack}"
              quantity="5"
            >Add to cart</cl-add-to-cart>
            <cl-price sku="${skus.backpack}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability sku="${skus.backpack}">
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
              sku="${skus.outOfStock}">Add to cart</cl-add-to-cart>
            <cl-price sku="${skus.outOfStock}">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
            <cl-availability sku="${skus.outOfStock}">
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
        <cl-cart-link target="_blank" class="hydrated">
          Cart
          <cl-cart-count class="hydrated"></cl-cart-count>
        </cl-cart-link>

        <div>
          <cl-add-to-cart sku="${skus.cap}" quantity="1" role="button" tabindex="0" class="hydrated">Add to cart</cl-add-to-cart>
          <cl-price sku="${skus.cap}" class="hydrated">
            <cl-price-amount type="price" class="hydrated"></cl-price-amount>
            <cl-price-amount type="compare-at" class="hydrated"></cl-price-amount>
          </cl-price>
          <cl-availability class="hydrated" sku="${skus.cap}">
            <cl-availability-status class="hydrated" type="available">
              <span style="color: green;">Available</span>
              ready to be shipped in
              <cl-availability-info class="hydrated" type="min-days"></cl-availability-info>
              -
              <cl-availability-info class="hydrated" type="max-days"></cl-availability-info>
              days with
              <cl-availability-info class="hydrated" type="shipping-method-name"></cl-availability-info>
              (<cl-availability-info class="hydrated" type="shipping-method-price"></cl-availability-info>)
            </cl-availability-status>
            <cl-availability-status aria-disabled="true" class="hydrated" type="unavailable">Out Of Stock</cl-availability-status>
          </cl-availability>
        </div>

        <div>
          <cl-add-to-cart sku="${skus.backpack}" quantity="5" role="button" tabindex="0" class="hydrated">Add to cart</cl-add-to-cart>
          <cl-price sku="${skus.backpack}" class="hydrated">
            <cl-price-amount type="price" class="hydrated"></cl-price-amount>
            <cl-price-amount type="compare-at" class="hydrated"></cl-price-amount>
          </cl-price>
          <cl-availability class="hydrated" sku="${skus.backpack}">
            <cl-availability-status class="hydrated" type="available">
              <span style="color: green;">Available</span>
              ready to be shipped in
              <cl-availability-info class="hydrated" type="min-days"></cl-availability-info>
              -
              <cl-availability-info class="hydrated" type="max-days"></cl-availability-info>
              days with
              <cl-availability-info class="hydrated" type="shipping-method-name"></cl-availability-info>
              (<cl-availability-info class="hydrated" type="shipping-method-price"></cl-availability-info>)
            </cl-availability-status>
            <cl-availability-status aria-disabled="true" class="hydrated" type="unavailable">Out Of Stock</cl-availability-status>
          </cl-availability>
        </div>

        <div>
          <cl-add-to-cart aria-disabled="true" sku="${skus.outOfStock}" quantity="1" role="button" tabindex="0" class="hydrated">Add to cart</cl-add-to-cart>
          <cl-price sku="${skus.outOfStock}" class="hydrated">
            <cl-price-amount type="price" class="hydrated"></cl-price-amount>
            <cl-price-amount type="compare-at" class="hydrated"></cl-price-amount>
          </cl-price>
          <cl-availability class="hydrated" sku="${skus.outOfStock}">
            <cl-availability-status aria-disabled="true" class="hydrated" type="available">
              <span style="color: green;">Available</span>
              ready to be shipped in
              <cl-availability-info class="hydrated" type="min-days"></cl-availability-info>
              -
              <cl-availability-info class="hydrated" type="max-days"></cl-availability-info>
              days with
              <cl-availability-info class="hydrated" type="shipping-method-name"></cl-availability-info>
              (<cl-availability-info class="hydrated" type="shipping-method-price"></cl-availability-info>)
            </cl-availability-status>
            <cl-availability-status class="hydrated" type="unavailable">Out Of Stock</cl-availability-status>
          </cl-availability>
        </div>
      </div>
    `)

    /**
     * EXPECTATIONS FOR "CAP" PRODUCT
     */

    expect(await capElements.getPriceAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          $31.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await capElements.getPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            $39.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await capElements.getAvailabilityInfoMinDays(page)).toEqualHtml(`
      <cl-availability-info class="hydrated" type="min-days">
        <mock:shadow-root>
          3
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await capElements.getAvailabilityInfoMaxDays(page)).toEqualHtml(`
      <cl-availability-info class="hydrated" type="max-days">
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await capElements.getAvailabilityInfoShippingMethodName(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="shipping-method-name">
        <mock:shadow-root>
          Express Delivery
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await capElements.getAvailabilityInfoShippingMethodPrice(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="shipping-method-price">
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "BACKPACK" PRODUCT
     */

    expect(await backpackElements.getPriceAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          $110.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await backpackElements.getPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await backpackElements.getAvailabilityInfoMinDays(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="min-days">
        <mock:shadow-root>
          3
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await backpackElements.getAvailabilityInfoMaxDays(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="max-days">
        <mock:shadow-root>
          4
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await backpackElements.getAvailabilityInfoShippingMethodName(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="shipping-method-name">
        <mock:shadow-root>
          Express Delivery
        </mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await backpackElements.getAvailabilityInfoShippingMethodPrice(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="shipping-method-price">
        <mock:shadow-root>
          $7.00
        </mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * EXPECTATIONS FOR "OUT OF STOCK" PRODUCT
     */

    expect(await outOfStockElements.getPriceAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          $31.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await outOfStockElements.getPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            $39.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await outOfStockElements.getAvailabilityInfoMinDays(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="min-days">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await outOfStockElements.getAvailabilityInfoMaxDays(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="max-days">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(await outOfStockElements.getAvailabilityInfoShippingMethodName(page))
      .toEqualHtml(`
      <cl-availability-info class="hydrated" type="shipping-method-name">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    expect(
      await outOfStockElements.getAvailabilityInfoShippingMethodPrice(page)
    ).toEqualHtml(`
      <cl-availability-info class="hydrated" type="shipping-method-price">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)

    /**
     * ADD TO CART
     */

    expect(await getCartCount(page)).toEqualHtml(`
      <cl-cart-count class="hydrated">
        <mock:shadow-root></mock:shadow-root>
      </cl-cart-count>
    `)

    const accessToken = (await getAccessToken(page)) ?? 'null'

    expect(await getCartLink(page)).toEqualHtml(`
      <cl-cart-link target="_blank" class="hydrated">
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count class="hydrated"></cl-cart-count>
      </cl-cart-link>
    `)

    /**
     * ADDING "OUT OF STOCK" TO CART
     */

    await (await outOfStockElements.addToCart(page)).click()

    /**
     * ADDING "CAP" TO CART
     */

    await (await capElements.addToCart(page)).click()

    await waitAndExpectForLineItems(page, {
      sku: skus.cap,
      quantity: 1
    })

    await page.waitForNetworkIdle()

    const cartId = (await getCartId(page)) ?? 'null'
    expect(await page.find('cl-cart-link')).toEqualHtml(`
      <cl-cart-link target="_blank" class="hydrated">
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count class="hydrated" quantity="1"></cl-cart-count>
      </cl-cart-link>
    `)

    expect(await page.find('cl-cart-count')).toEqualHtml(`
      <cl-cart-count quantity="1" class="hydrated">
        <mock:shadow-root>
          1
        </mock:shadow-root>
      </cl-cart-count>
    `)

    /**
     * ADDING "BACKPACK" TO CART
     */

    await (await backpackElements.addToCart(page)).click()

    await waitAndExpectForLineItems(page, {
      sku: skus.backpack,
      quantity: 5
    })

    await page.waitForNetworkIdle()

    expect(await page.find('cl-cart-link')).toEqualHtml(`
      <cl-cart-link target="_blank" class="hydrated">
        <mock:shadow-root>
          <a
            href="https://drop-in-js.commercelayer.app/cart/${cartId}?accessToken=${accessToken}"
            target="_blank"
          >
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
        <cl-cart-count class="hydrated" quantity="6"></cl-cart-count>
      </cl-cart-link>
    `)

    expect(await page.find('cl-cart-count')).toEqualHtml(`
      <cl-cart-count quantity="6" class="hydrated">
        <mock:shadow-root>
          6
        </mock:shadow-root>
      </cl-cart-count>
    `)
  })
})
