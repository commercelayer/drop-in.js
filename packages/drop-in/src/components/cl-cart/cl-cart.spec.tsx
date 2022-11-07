import * as cart from '#apis/commercelayer/cart'
import { newSpecPage } from '@stencil/core/testing'
import { ClCart } from './cl-cart'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-cart', () => {
  it('renders', async () => {
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
              title="Cart"
              frameborder="0"
              id="iFrameResizer0"
              scrolling="no"
              src="https://example.com/checkout-url"
              style="width: 1px; min-width: 100%; min-height: 100%; overflow: hidden;"
            ></iframe>
          </div>
        </mock:shadow-root>
      </cl-cart>
    `)
  })
})
