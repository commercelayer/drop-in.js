import { newSpecPage } from '@stencil/core/testing'
import { CLAddToCart } from './cl-add-to-cart'

describe.skip('cl-add-to-cart.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="BACKPACK818488000000XXXX"></cl-add-to-cart>',
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-add-to-cart>
    `)
  })
})
