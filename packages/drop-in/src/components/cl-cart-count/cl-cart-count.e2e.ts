import { newE2EPage } from '@stencil/core/testing'

describe('cl-cart-count.e2e', () => {
  it('renders', async () => {
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
        <cl-cart-count></cl-cart-count>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-cart-count')
    expect(element).toHaveClass('hydrated')

    expect(element).toEqualHtml(`
      <cl-cart-count class="hydrated">
        <mock:shadow-root></mock:shadow-root>
      </cl-cart-count>
    `)
  })

  it('should update the cart-count when a product is added to cart', async () => {
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
        <cl-cart-count></cl-cart-count>
        <cl-add-to-cart sku="BACKPACK818488000000XXXX">Add to cart</cl-add-to-cart>
      `
    })

    await page.waitForChanges()

    const addToCart = await page.find('cl-add-to-cart')
    const cartCount = await page.find('cl-cart-count')

    await addToCart.click()

    await page.waitForChanges()

    expect(cartCount).toEqualHtml(`
      <cl-cart-count class="hydrated" quantity="1">
        <mock:shadow-root>1</mock:shadow-root>
      </cl-cart-count>
    `)
  })
})
