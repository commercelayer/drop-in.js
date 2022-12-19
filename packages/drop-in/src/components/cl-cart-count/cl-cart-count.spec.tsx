import type { TriggerCartUpdateEvent } from '#apis/commercelayer/cart'
import { newSpecPage } from '@stencil/core/testing'
import { ClCartCount } from './cl-cart-count'
import * as client from '#apis/commercelayer/client'

describe('cl-cart-count.spec', () => {
  it('renders', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue('token-123')

    const { root } = await newSpecPage({
      components: [ClCartCount],
      html: `<cl-cart-count></cl-cart-count>`
    })

    expect(root).toEqualHtml(`
      <cl-cart-count>
        <mock:shadow-root>0</mock:shadow-root>
      </cl-cart-count>
    `)
  })

  it('renders without content when "hide-when-empty" attribute is set to `true`', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue('token-123')

    const { root } = await newSpecPage({
      components: [ClCartCount],
      html: `<cl-cart-count hide-when-empty="true"></cl-cart-count>`
    })

    expect(root).toEqualHtml(`
      <cl-cart-count hide-when-empty>
        <mock:shadow-root></mock:shadow-root>
      </cl-cart-count>
    `)
  })

  it('renders with updated quantity when "cartUpdate" is triggered with order details', async () => {
    const { root, waitForChanges, win } = await newSpecPage({
      components: [ClCartCount],
      html: `<cl-cart-count></cl-cart-count>`
    })

    win.dispatchEvent(
      new CustomEvent<TriggerCartUpdateEvent>('cartUpdate', {
        detail: {
          order: {
            id: 'ABC123',
            type: 'orders',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            skus_count: 12
          }
        }
      })
    )

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-cart-count quantity="12">
        <mock:shadow-root>
          12
        </mock:shadow-root>
      </cl-cart-count>
    `)
  })

  it('renders as empty when "cartUpdate" is triggered with empty order', async () => {
    const { root, waitForChanges, win } = await newSpecPage({
      components: [ClCartCount],
      html: `<cl-cart-count></cl-cart-count>`
    })

    win.dispatchEvent(
      new CustomEvent<TriggerCartUpdateEvent>('cartUpdate', {
        detail: {
          order: {
            id: 'ABC123',
            type: 'orders',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            skus_count: 12
          }
        }
      })
    )

    await waitForChanges()

    win.dispatchEvent(
      new CustomEvent<TriggerCartUpdateEvent>('cartUpdate', {
        detail: {
          order: {
            id: 'ABC123',
            type: 'orders',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            skus_count: 0
          }
        }
      })
    )

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-cart-count>
        <mock:shadow-root>0</mock:shadow-root>
      </cl-cart-count>
    `)
  })
})
