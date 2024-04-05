import * as cart from '#apis/commercelayer/cart'
import * as client from '#apis/commercelayer/client'
import { newSpecPage } from '@stencil/core/testing'
import { ClCheckoutLink } from './cl-checkout-link'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-checkout-link.spec', () => {
  it('renders the checkout url without a cartId during the first load', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:code:usa'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClCheckoutLink],
      html: '<cl-checkout-link>Checkout</cl-checkout-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-checkout-link aria-disabled="true" target="_self">
        <a target="_self">
          Checkout
        </a>
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
        <a href="https://checkout.url" target="_self">
          Checkout
        </a>
      </cl-checkout-link>
    `)
  })
})
