import { newSpecPage } from '@stencil/core/testing'
import { ClCartCount } from './cl-cart-count'

describe('cl-cart-count.spec', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ClCartCount],
      html: `<cl-cart-count></cl-cart-count>`
    })
    expect(page.root).toEqualHtml(`
      <cl-cart-count>
        <mock:shadow-root></mock:shadow-root>
      </cl-cart-count>
    `)
  })
})
