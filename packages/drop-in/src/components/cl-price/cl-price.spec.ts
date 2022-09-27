import { newSpecPage } from '@stencil/core/testing'
import { CLPrice } from './cl-price'

describe('cl-price.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLPrice],
      html: '<cl-price sku="BACKPACK818488000000XXXX"></cl-price>',
    })
    expect(root).toEqualHtml(`
      <cl-price sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-price>
    `)
  })
})
