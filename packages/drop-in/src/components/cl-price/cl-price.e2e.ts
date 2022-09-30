import { newE2EPage } from '@stencil/core/testing';

describe('cl-price.e2e', () => {
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
        <cl-price></cl-price>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-price')

    expect(element).toEqualHtml(`
      <cl-price class="hydrated">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-price>
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
        <cl-price sku="BACKPACK818488000000XXXX"></cl-price>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-price')
    // await element.waitForEvent('priceUpdate')

    expect(element).toEqualHtml(`
      <cl-price class="hydrated" sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-price>
    `)
  });

  it('renders with a sku and display prices into cl-price inner-components', async () => {
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
        <cl-price sku="BACKPACK818488000000XXXX">
          <s><cl-price-amount type="compare-at"></cl-price-amount></s>
          <cl-price-amount></cl-price-amount>
        </cl-price>
      `
    })

    await page.waitForChanges()

    const clPrice = await page.find('cl-price')
    expect(clPrice).toEqualHtml(`
      <cl-price class="hydrated" sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <s><cl-price-amount class="hydrated" type="compare-at"></cl-price-amount></s>
        <cl-price-amount class="hydrated" type="price"></cl-price-amount>
      </cl-price>
    `)

    const clPriceCompareAtAmount = await page.find('cl-price-amount[type="compare-at"]')
    expect(clPriceCompareAtAmount).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          $152.00
        </mock:shadow-root>
      </cl-price-amount>
    `)

    const clPriceAmount = await page.find('cl-price-amount[type="price"]')
    expect(clPriceAmount).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          $130.00
        </mock:shadow-root>
      </cl-price-amount>
    `)
  });
});
