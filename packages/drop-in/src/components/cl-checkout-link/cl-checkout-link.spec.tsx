import * as client from '#apis/commercelayer/client'
import * as cart from '#apis/commercelayer/cart'
import { newSpecPage } from '@stencil/core/testing'
import { ClCheckoutLink } from './cl-checkout-link'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-checkout-link.spec', () => {
  it('renders the checkout url without a cartId during the first load', async () => {
    const fakeAccessToken = 'token-123'

    jest.spyOn(client, 'getAccessToken').mockResolvedValue(fakeAccessToken)

    const { root, waitForChanges } = await newSpecPage({
      components: [ClCheckoutLink],
      html: '<cl-checkout-link>Checkout</cl-checkout-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-checkout-link aria-disabled="true" target="_self">
        <mock:shadow-root>
          <a part="a" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Checkout
      </cl-checkout-link>
    `)
  })

  it('renders the checkout url with a defined checkoutUrl', async () => {
    jest.spyOn(cart, 'getCheckoutUrl').mockResolvedValue('https://checkout.url')

    const { root, waitForChanges } = await newSpecPage({
      components: [ClCheckoutLink],
      html: '<cl-checkout-link>Checkout</cl-checkout-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-checkout-link target="_self">
        <mock:shadow-root>
          <a href="https://checkout.url" part="a" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Checkout
      </cl-checkout-link>
    `)
  })
})
