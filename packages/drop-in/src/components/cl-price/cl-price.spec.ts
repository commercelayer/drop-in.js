import { newSpecPage } from '@stencil/core/testing'
import { CLPrice } from './cl-price'

describe('spec.cl-price', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLPrice],
      html: '<cl-price sku="BACKPACK818488000000XXXX"></cl-price>',
    })
    expect(root).toEqualHtml(`
      <cl-price sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <div>
            <s></s>
          </div>
        </mock:shadow-root>
      </cl-price>
    `)
  })
})
