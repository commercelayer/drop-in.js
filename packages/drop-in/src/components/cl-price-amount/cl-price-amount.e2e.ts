import { newE2EPage } from '@stencil/core/testing';

describe('cl-price-amount.e2e', () => {

  it('renders as price when `type` is not defined', async () => {
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
        <cl-price-amount></cl-price-amount>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-price-amount')

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    element.triggerEvent('priceUpdate', { detail: { formatted_amount: '123$', formatted_compare_at_amount: '321$' } })

    await page.waitForChanges()

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          123$
        </mock:shadow-root>
      </cl-price-amount>
    `)
  })

  it('renders as price when `type="price"`', async () => {
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
        <cl-price-amount type="price"></cl-price-amount>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-price-amount')

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    element.triggerEvent('priceUpdate', { detail: { formatted_amount: '123$', formatted_compare_at_amount: '321$' } })

    await page.waitForChanges()

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated" type="price">
        <mock:shadow-root>
          123$
        </mock:shadow-root>
      </cl-price-amount>
    `)
  })

  it('renders as compare_at when `type="compare-at"`', async () => {
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
        <cl-price-amount type="compare-at"></cl-price-amount>
      `
    })

    await page.waitForChanges()

    const element = await page.find('cl-price-amount')

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough"></s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    element.triggerEvent('priceUpdate', { detail: { formatted_amount: '123$', formatted_compare_at_amount: '321$' } })

    await page.waitForChanges()

    expect(element).toEqualHtml(`
      <cl-price-amount class="hydrated" type="compare-at">
        <mock:shadow-root>
          <s part="strikethrough">
            321$
          </s>
        </mock:shadow-root>
      </cl-price-amount>
    `)
  })

})
