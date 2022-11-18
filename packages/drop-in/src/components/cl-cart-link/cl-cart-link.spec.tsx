import * as client from '#apis/commercelayer/client'
import * as cart from '#apis/commercelayer/cart'
import { newSpecPage } from '@stencil/core/testing'
import { CLCartLink } from './cl-cart-link'
import { waitFor } from 'jest.spec.helpers'

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

    await waitFor(waitForChanges, () => {
      const link = root?.shadowRoot?.querySelector('a')
      return (
        link?.getAttribute('href') ===
        `https://drop-in-js.commercelayer.app/cart/null?accessToken=${fakeAccessToken}`
      )
    })

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <mock:shadow-root>
          <a href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${fakeAccessToken}" part="a" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
      </cl-cart-link>
    `)
  })

  it('renders the cart url with a defined cartUrl', async () => {
    jest.spyOn(cart, 'getCartUrl').mockResolvedValue('https://cart.url')

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <mock:shadow-root>
          <a href="https://cart.url" part="a" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Cart
      </cl-cart-link>
    `)
  })
})
