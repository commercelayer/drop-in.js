import { newE2EPage } from '@stencil/core/testing';

describe('e2e.cl-price', () => {
  it('renders without a sku', async () => {
    const page = await newE2EPage({
      waitUntil: 'networkidle0',
      html: `
        <script>
          (function() {
            commercelayerConfig = {
              clientId: 'xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU',
              endpoint: 'https://demo-store-1.commercelayer.io',
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
          <div>
            <s></s>
            
          </div>
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
            endpoint: 'https://demo-store-1.commercelayer.io',
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
          <div>
            <s>$152.00</s>
            $130.00
          </div>
        </mock:shadow-root>
      </cl-price>
    `)
  });
});
