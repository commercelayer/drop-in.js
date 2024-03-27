import * as cart from '#apis/commercelayer/cart'
import * as client from '#apis/commercelayer/client'
import type { CommerceLayerClient } from '@commercelayer/sdk'
import { newSpecPage } from '@stencil/core/testing'
import { waitFor } from 'jest.spec.helpers'
import { CLCartLink } from './cl-cart-link'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-cart-link.spec', () => {
  it('renders the cart url without a cartId during the first load', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:code:usa'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector('a')
      return (
        link?.getAttribute('href') ===
        'https://drop-in-js.commercelayer.app/cart/null?accessToken=token-123'
      )
    })

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <a href="https://drop-in-js.commercelayer.app/cart/null?accessToken=token-123" target="_self">
          Cart
        </a>
      </cl-cart-link>
    `)
  })

  it('renders the cart url with a defined cartUrl', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:code:usa'
    })
    jest.spyOn(cart, 'getCart').mockResolvedValue({
      type: 'orders',
      id: 'order-123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'approved',
      fulfillment_status: 'fulfilled',
      payment_status: 'paid'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <a href="https://drop-in-js.commercelayer.app/cart/order-123?accessToken=token-123" target="_self">
          Cart
        </a>
      </cl-cart-link>
    `)
  })

  it('renders the cart url with a cartId after clicking on the link when url is invalid', async () => {
    const orders: Partial<CommerceLayerClient['orders']> = {
      create: jest.fn().mockResolvedValue({
        type: 'orders',
        id: 'order-123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    }

    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:code:usa'
    })
    jest.spyOn(cart, 'getCart').mockResolvedValue(null)
    jest
      .spyOn(client, 'createClient')
      .mockResolvedValue({ orders } as unknown as CommerceLayerClient)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector('a')
      return (
        link?.getAttribute('href') ===
        'https://drop-in-js.commercelayer.app/cart/null?accessToken=token-123'
      )
    })

    root?.querySelector('a')?.click()

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector('a')
      return (
        link?.getAttribute('href') ===
        'https://drop-in-js.commercelayer.app/cart/order-123?accessToken=token-123'
      )
    })

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <a href="https://drop-in-js.commercelayer.app/cart/order-123?accessToken=token-123" target="_self">
          Cart
        </a>
      </cl-cart-link>
    `)
  })
})
