import { newE2EPage } from '@stencil/core/testing';

describe.skip('cl-add-to-cart.e2e', () => {
  it('renders without a sku', async () => {
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
        <cl-add-to-cart></cl-add-to-cart>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-add-to-cart')

    expect(element).toEqualHtml(`
      <cl-add-to-cart class="hydrated">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-add-to-cart>
    `)
  });

  it('renders with a sku', async () => {
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
        <cl-add-to-cart sku="BACKPACK818488000000XXXX"></cl-add-to-cart>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-add-to-cart')
    // await element.waitForEvent('priceUpdate')

    expect(element).toEqualHtml(`
      <cl-add-to-cart class="hydrated" sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-add-to-cart>
    `)
  });

  it('renders with a sku and display prices into cl-add-to-cart inner-components', async () => {
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
        <cl-add-to-cart sku="BACKPACK818488000000XXXX">
          <s><cl-add-to-cart-amount type="compare-at"></cl-add-to-cart-amount></s>
          <cl-add-to-cart-amount></cl-add-to-cart-amount>
        </cl-add-to-cart>
      `
    })

    await page.waitForChanges()

    const clPrice = await page.find('cl-add-to-cart')
    expect(clPrice).toEqualHtml(`
      <cl-add-to-cart class="hydrated" sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <s><cl-add-to-cart-amount class="hydrated" type="compare-at"></cl-add-to-cart-amount></s>
        <cl-add-to-cart-amount class="hydrated"></cl-add-to-cart-amount>
      </cl-add-to-cart>
    `)

    const clPriceCompareAtAmount = await page.find('cl-add-to-cart-amount[type="compare-at"]')
    expect(clPriceCompareAtAmount).toEqualHtml(`
      <cl-add-to-cart-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          $152.00
        </mock:shadow-root>
      </cl-add-to-cart-amount>
    `)

    const clPriceAmount = await page.find('cl-add-to-cart-amount:not([type])')
    expect(clPriceAmount).toEqualHtml(`
      <cl-add-to-cart-amount class="hydrated">
        <mock:shadow-root>
          $130.00
        </mock:shadow-root>
      </cl-add-to-cart-amount>
    `)
  });
});
