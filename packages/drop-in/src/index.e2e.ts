import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing'
import {
  waitAndExpectForLineItems,
  getAccessToken,
  getCommerceLayerConfiguration,
  getCartId
} from 'jest.e2e.helpers'

const capSku = '5PANECAP000000FFFFFFXXXX'
const backpackSku = 'BACKPACKFFFFFF000000XXXX'

// eslint-disable-next-line prettier/prettier
const getCartLink = async (page: E2EPage): Promise<E2EElement> => await page.find('cl-cart-link')

// eslint-disable-next-line prettier/prettier
const getCartCount = async (page: E2EPage): Promise<E2EElement> => await page.find('cl-cart-link cl-cart-count')

// eslint-disable-next-line prettier/prettier
const getCapAddToCart = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-add-to-cart[sku="${capSku}"]`)

// eslint-disable-next-line prettier/prettier
const getCapPrice = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-price[sku="${capSku}"]`)

// eslint-disable-next-line prettier/prettier
const getCapPriceAmount = async (page: E2EPage): Promise<E2EElement> => await (await getCapPrice(page)).find('cl-price-amount[type="price"]')

// eslint-disable-next-line prettier/prettier
const getCapPriceCompareAtAmount = async (page: E2EPage): Promise<E2EElement> => await (await getCapPrice(page)).find('cl-price-amount[type="compare-at"]')

// eslint-disable-next-line prettier/prettier
const getBackpackAddToCart = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-add-to-cart[sku="${backpackSku}"]`)

// eslint-disable-next-line prettier/prettier
const getBackpackPrice = async (page: E2EPage): Promise<E2EElement> => await page.find(`cl-price[sku="${backpackSku}"]`)

// eslint-disable-next-line prettier/prettier
const getBackpackPriceAmount = async (page: E2EPage): Promise<E2EElement> => await (await getBackpackPrice(page)).find('cl-price-amount[type="price"]')

// eslint-disable-next-line prettier/prettier
const getBackpackPriceCompareAtAmount = async (page: E2EPage): Promise<E2EElement> => await (await getBackpackPrice(page)).find('cl-price-amount[type="compare-at"]')

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
            <cl-add-to-cart sku="5PANECAP000000FFFFFFXXXX">Add to cart</cl-add-to-cart>
            <cl-price sku="5PANECAP000000FFFFFFXXXX">
              <cl-price-amount></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
          </div>

          <div>
            <cl-add-to-cart sku="BACKPACKFFFFFF000000XXXX" quantity="5">Add to cart</cl-add-to-cart>
            <cl-price sku="BACKPACKFFFFFF000000XXXX">
              <cl-price-amount type="price"></cl-price-amount>
              <cl-price-amount type="compare-at"></cl-price-amount>
            </cl-price>
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
          <cl-add-to-cart sku="5PANECAP000000FFFFFFXXXX" quantity="1" role="button" tabindex="0" class="hydrated">Add to cart</cl-add-to-cart>
          <cl-price sku="5PANECAP000000FFFFFFXXXX" class="hydrated">
            <cl-price-amount type="price" class="hydrated"></cl-price-amount>
            <cl-price-amount type="compare-at" class="hydrated"></cl-price-amount>
          </cl-price>
        </div>

        <div>
          <cl-add-to-cart sku="BACKPACKFFFFFF000000XXXX" quantity="5" role="button" tabindex="0" class="hydrated">Add to cart</cl-add-to-cart>
          <cl-price sku="BACKPACKFFFFFF000000XXXX" class="hydrated">
            <cl-price-amount type="price" class="hydrated"></cl-price-amount>
            <cl-price-amount type="compare-at" class="hydrated"></cl-price-amount>
          </cl-price>
        </div>
      </div>
    `)

    expect(await getCapPriceAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          $31.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await getCapPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            $39.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await getBackpackPriceAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          $95.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    expect(await getBackpackPriceCompareAtAmount(page)).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            $110.00
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

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
     * ADDING "CAP" TO CART
     */

    await (await getCapAddToCart(page)).click()

    await waitAndExpectForLineItems(page, {
      sku: '5PANECAP000000FFFFFFXXXX',
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

    await (await getBackpackAddToCart(page)).click()

    await waitAndExpectForLineItems(page, {
      sku: 'BACKPACKFFFFFF000000XXXX',
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
