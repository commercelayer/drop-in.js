import { newSpecPage } from '@stencil/core/testing'
import { ClCheckoutLink } from './cl-checkout-link'

describe('cl-checkout-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ClCheckoutLink],
      html: `<cl-checkout-link></cl-checkout-link>`
    })
    expect(page.root).toEqualHtml(`
      <cl-checkout-link aria-disabled="true" target="_self">
        <mock:shadow-root>
          <a aria-disabled="true" part="link" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
      </cl-checkout-link>
    `)
  })
})
