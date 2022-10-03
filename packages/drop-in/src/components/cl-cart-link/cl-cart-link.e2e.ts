import * as cart from '#apis/commercelayer/cart'
import { newE2EPage } from '@stencil/core/testing'

const cartUrl = 'https://example.com/checkout-url'

const getCartUrlSpy = jest.spyOn(cart, 'getCartUrl').mockReturnValue(
  Promise.resolve(cartUrl)
)

beforeEach(() => {
  getCartUrlSpy.mockClear()
})

describe('cl-cart-link.e2e', () => {
  it('renders the cart url without a cartId during the fist load', async () => {
    const page = await newE2EPage({
      waitUntil: 'networkidle0',
      url: 'https://demo-store-1.commercelayer.io',
      html: `
        <script>
          (function() {
            commercelayerConfig = {
              clientId: 'xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU',
              slug: 'demo-store-1',
              scope: 'market:10426'
            }
          }());
        </script>
        <cl-cart-link>Cart</cl-cart-link>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-cart-link')

    const accessTokenCookieName = 'clayer_token-xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU-market:10426'
    const accessTokenCookie = await (await page.cookies()).find(cookie => cookie.name === encodeURIComponent(accessTokenCookieName))

    expect(element).toEqualHtml(`
      <cl-cart-link class="hydrated" target="_self">
        <mock:shadow-root>
          <a href="${`https://demo-store-1.commercelayer.app/cart/null?accessToken=${accessTokenCookie?.value}`}" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
      </cl-cart-link>
    `)
  })

  it('renders a cart url with a proper orderId when clicking on the link', async () => {
    const page = await newE2EPage({
      waitUntil: 'networkidle0',
      url: 'https://demo-store-1.commercelayer.io',
      html: `
        <script>
          (function() {
            commercelayerConfig = {
              clientId: 'xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU',
              slug: 'demo-store-1',
              scope: 'market:10426'
            }
          }());
        </script>
        <cl-cart-link>Cart</cl-cart-link>
      `
    })

    await page.waitForChanges()

    await page.addScriptTag({ content: 'window.open = function() {}' })

    const aTag = await page.find('cl-cart-link >>> a')
    await aTag.click()

    await page.waitForResponse('https://demo-store-1.commercelayer.io/api/orders')
    await page.waitForChanges()

    const accessTokenCookieName = 'clayer_token-xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU-market:10426'
    const accessTokenCookie = await (await page.cookies()).find(cookie => cookie.name === encodeURIComponent(accessTokenCookieName))

    const orderIdCookieName = 'cl-drop-in--order-id'
    const orderIdCookie = await (await page.cookies()).find(cookie => cookie.name === encodeURIComponent(orderIdCookieName))

    const element = await page.find('cl-cart-link')

    expect(element).toEqualHtml(`
      <cl-cart-link class="hydrated" target="_self">
        <mock:shadow-root>
          <a href="${`https://demo-store-1.commercelayer.app/cart/${orderIdCookie?.value}?accessToken=${accessTokenCookie?.value}`}" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
      </cl-cart-link>
    `)
  })
})
