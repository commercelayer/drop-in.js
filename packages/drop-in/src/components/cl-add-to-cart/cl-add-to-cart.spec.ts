import { newSpecPage } from '@stencil/core/testing'
import { CLAddToCart } from './cl-add-to-cart'

describe('cl-add-to-cart.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="BACKPACK818488000000XXXX">Add to cart</cl-add-to-cart>',
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart quantity="1" role="button" sku="BACKPACK818488000000XXXX" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })
})
