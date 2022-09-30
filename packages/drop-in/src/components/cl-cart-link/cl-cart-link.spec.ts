import { newSpecPage } from '@stencil/core/testing'
import { CLCartLink } from './cl-cart-link'

describe.skip('cl-add-to-cart.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLCartLink],
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
