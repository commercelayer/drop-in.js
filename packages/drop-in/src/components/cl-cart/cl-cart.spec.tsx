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
})
