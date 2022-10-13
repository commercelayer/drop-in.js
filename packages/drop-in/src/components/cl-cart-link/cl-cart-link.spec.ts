import * as client from '#apis/commercelayer/client'
import { newSpecPage } from '@stencil/core/testing'
import { CLCartLink } from './cl-cart-link'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-cart-link.spec', () => {
  it('renders the cart url without a cartId during the first load', async () => {
    const fakeAccessToken = 'token-123'

    jest.spyOn(client, 'getAccessToken').mockResolvedValue(fakeAccessToken)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-cart-link target="_self">
        <mock:shadow-root>
          <a href="https://demo-store-1.commercelayer.app/cart/null?accessToken=${fakeAccessToken}" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
      </cl-cart-link>
    `)
  })
})
