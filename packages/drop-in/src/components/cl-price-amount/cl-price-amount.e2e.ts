import { newE2EPage } from '@stencil/core/testing';

describe('e2e.cl-price-amount', () => {
  it('renders', async () => {
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
        <cl-price-amount></cl-price-amount>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-price-amount')

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated">
        <mock:shadow-root>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    element.triggerEvent('priceUpdate', { detail: { formatted_amount: '432$' } })
    await page.waitForChanges()

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated">
        <mock:shadow-root>
          432$
        </mock:shadow-root>
      </cl-price-amount>
    `)
  });
});
