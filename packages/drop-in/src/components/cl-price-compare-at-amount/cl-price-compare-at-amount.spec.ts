import { newSpecPage } from '@stencil/core/testing'
import { CLPriceCompareAtAmount } from './cl-price-compare-at-amount'

describe('cl-price-compare-at-amount.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLPriceCompareAtAmount],
      html: '<cl-price-compare-at-amount></cl-price-compare-at-amount>',
    })
    expect(root).toEqualHtml(`
      <cl-price-compare-at-amount>
        <mock:shadow-root>
        </mock:shadow-root>
      </cl-price-compare-at-amount>
    `)
  })
})
