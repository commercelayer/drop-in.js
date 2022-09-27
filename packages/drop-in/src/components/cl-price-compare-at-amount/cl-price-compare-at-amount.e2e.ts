import { newE2EPage } from '@stencil/core/testing';

describe('cl-price-compare-at-amount.ee', () => {
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
        <cl-price-compare-at-amount></cl-price-compare-at-amount>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-price-compare-at-amount')

    expect(element).toEqualHtml(`
      <cl-price-compare-at-amount class="hydrated">
        <mock:shadow-root>
        </mock:shadow-root>
      </cl-price-compare-at-amount>
    `)

    element.triggerEvent('priceUpdate', { detail: { formatted_compare_at_amount: '1234$' } })
    await page.waitForChanges()

    expect(element).toEqualHtml(`
      <cl-price-compare-at-amount class="hydrated">
        <mock:shadow-root>
          1234$
        </mock:shadow-root>
      </cl-price-compare-at-amount>
    `)
  });
});
