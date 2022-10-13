import type { Order } from '@commercelayer/sdk'
import { newSpecPage } from '@stencil/core/testing'
import { ClCartCount } from './cl-cart-count'

describe('cl-cart-count.spec', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ClCartCount],
      html: `<cl-cart-count></cl-cart-count>`
    })

    expect(root).toEqualHtml(`
      <cl-cart-count>
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
      new CustomEvent<Order>('cartUpdate', {
        detail: {
          id: 'ABC123',
          type: 'orders',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skus_count: 12
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
      new CustomEvent<Order>('cartUpdate', {
        detail: {
          id: 'ABC123',
          type: 'orders',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skus_count: 12
        }
      })
    )

    await waitForChanges()

    win.dispatchEvent(
      new CustomEvent<Order>('cartUpdate', {
        detail: {
          id: 'ABC123',
          type: 'orders',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          skus_count: 0
        }
      })
    )

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-cart-count>
        <mock:shadow-root></mock:shadow-root>
      </cl-cart-count>
    `)
  })
})
