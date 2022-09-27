import { newSpecPage } from '@stencil/core/testing'
import { CLPriceAmount } from './cl-price-amount'

describe('cl-price-amount.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount></cl-price-amount>',
    })
    expect(root).toEqualHtml(`
      <cl-price-amount>
        <mock:shadow-root>
        </mock:shadow-root>
      </cl-price-amount>
    `)
  })
})
