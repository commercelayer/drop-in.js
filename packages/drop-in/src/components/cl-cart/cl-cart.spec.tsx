import * as cart from '#apis/commercelayer/cart'
import { CLCartLink } from '#components/cl-cart-link/cl-cart-link'
import { newSpecPage } from '@stencil/core/testing'
import { ClCart } from './cl-cart'
import * as client from '#apis/commercelayer/client'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-cart.spec', () => {
  it('renders', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue('token-123')

    jest
      .spyOn(cart, 'getCartUrl')
      .mockResolvedValue('https://example.com/checkout-url')

    const page = await newSpecPage({
      components: [ClCart],
      html: `<cl-cart></cl-cart>`
    })

    expect(page.root).toEqualHtml(`
      <cl-cart>
        <mock:shadow-root>
          <div>
            <iframe
              part="iframe"
              title="My Cart"
              id="iFrameResizer0"
              src="https://example.com/checkout-url"
              style="width: 1px; min-width: 100%; min-height: 100%; border: none; overflow: hidden;"
            ></iframe>
          </div>
        </mock:shadow-root>
      </cl-cart>
    `)
  })

  it('renders as minicart when used inside a `cl-cart-link`.', async () => {
    jest
      .spyOn(cart, 'getCartUrl')
      .mockResolvedValue('https://example.com/checkout-url')

    const page = await newSpecPage({
      components: [ClCart, CLCartLink],
      html: `
        <cl-cart-link>
          <cl-cart></cl-cart>
        </cl-cart-link>
      `
    })

    await page.waitForChanges()

    expect(page.root).toEqualHtml(`
      <cl-cart-link cl-hydrated role="button" tabindex="0" target="_self">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-cart type="mini" aria-hidden="true" tabindex="-1">
          <mock:shadow-root>
            <div>
              <iframe
                part="iframe"
                title="My Cart"
                id="iFrameResizer1"
                src="https://example.com/checkout-url"
                style="width: 1px; min-width: 100%; min-height: 100%; border: none; overflow: hidden;"
              ></iframe>
            </div>
          </mock:shadow-root>
        </cl-cart>
      </cl-cart-link>
    `)

    page.root?.click()

    await page.waitForChanges()

    expect(page.root).toEqualHtml(`
      <cl-cart-link cl-hydrated role="button" tabindex="0" target="_self">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-cart type="mini" open role="alertdialog" aria-modal="true">
          <mock:shadow-root>
            <div>
              <iframe
                part="iframe"
                title="My Cart"
                id="iFrameResizer1"
                src="https://example.com/checkout-url"
                style="width: 1px; min-width: 100%; min-height: 100%; border: none; overflow: hidden;"
              ></iframe>
            </div>
          </mock:shadow-root>
        </cl-cart>
      </cl-cart-link>
    `)
  })
})
