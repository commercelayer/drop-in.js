import { newE2EPage } from '@stencil/core/testing'
import { getAccessToken, getCartId } from 'jest.e2e.helpers'

describe('cl-cart-link.e2e', () => {
  it('renders the cart url without a cartId during the fist load', async () => {
    const page = await newE2EPage({
      waitUntil: 'networkidle0',
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

    const accessToken = (await getAccessToken(page)) ?? 'null'

    expect(element).toEqualHtml(`
      <cl-cart-link class="hydrated" target="_self">
        <mock:shadow-root>
          <a href="${`https://demo-store-1.commercelayer.app/cart/null?accessToken=${accessToken}`}" target="_self">
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

    const accessToken = (await getAccessToken(page)) ?? 'null'

    const aTag = await page.find('cl-cart-link >>> a')
    await aTag.click()

    await page.waitForResponse(async (RESPONSE) => {
      return RESPONSE.url().startsWith(
        'https://demo-store-1.commercelayer.app/cart'
      )
    })

    await page.waitForNetworkIdle()

    const cartUrl = page.url()

    // @ts-expect-error
    await page.goBack()
    await page.waitForChanges()

    const cartId = (await getCartId(page)) ?? 'null'

    expect(cartUrl).toEqual(
      `https://demo-store-1.commercelayer.app/cart/${cartId}?accessToken=${accessToken}`
    )
  })
})
