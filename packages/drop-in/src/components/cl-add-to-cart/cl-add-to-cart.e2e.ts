import { newE2EPage } from '@stencil/core/testing'
import { expectForLineItems } from 'jest.e2e.helpers'

describe('cl-add-to-cart.e2e', () => {
  it('should "add to cart" the given sku and the defaulted quantity', async () => {
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
        <cl-add-to-cart sku="BACKPACK818488000000XXXX">Add to cart</cl-add-to-cart>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-add-to-cart')

    expect(element).toEqualHtml(`
      <cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="1" role="button" tabindex="0" class="hydrated">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)

    await element.click()

    await expectForLineItems(page, {
      sku: 'BACKPACK818488000000XXXX',
      quantity: 1
    })
  })

  it('should "add to cart" the given sku and quantity', async () => {
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
        <cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="2">Add to cart</cl-add-to-cart>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-add-to-cart')

    expect(element).toEqualHtml(`
      <cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="2" role="button" tabindex="0" class="hydrated">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)

    await element.click()

    await expectForLineItems(page, {
      sku: 'BACKPACK818488000000XXXX',
      quantity: 2
    })
  })

  it('should "add to cart" after dynamically changing the sku and the quantity', async () => {
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
        <cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="2">Add to cart</cl-add-to-cart>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-add-to-cart')

    element.setAttribute('sku', 'APRONXXXFFFFFF000000XXXX')
    element.setAttribute('quantity', '5')
    await page.waitForChanges()

    expect(element).toEqualHtml(`
      <cl-add-to-cart sku="APRONXXXFFFFFF000000XXXX" quantity="5" role="button" tabindex="0" class="hydrated">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)

    await element.click()

    await expectForLineItems(page, {
      sku: 'APRONXXXFFFFFF000000XXXX',
      quantity: 5
    })
  })
})
