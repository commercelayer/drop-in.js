import * as cart from '#apis/commercelayer/cart'
import { newSpecPage } from '@stencil/core/testing'
import { CLCartLink } from './cl-cart-link'

const cartUrl = 'https://example.com/checkout-url'

const getCartUrlSpy = jest.spyOn(cart, 'getCartUrl').mockReturnValue(
  Promise.resolve(cartUrl)
);

beforeEach(() => {
  getCartUrlSpy.mockClear()
})

describe('cl-cart-link.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })
    expect(root).toEqualHtml(`
      <cl-cart-link target="_self">
        <mock:shadow-root>
          <a href="${cartUrl}" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
      </cl-cart-link>
    `)
  })
})
