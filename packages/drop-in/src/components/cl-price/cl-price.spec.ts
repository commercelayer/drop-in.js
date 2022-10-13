import type { Price } from '@commercelayer/sdk'
import { newSpecPage } from '@stencil/core/testing'
import { CLPrice } from './cl-price'

describe('cl-price.spec', () => {
  it('renders without attributes', async () => {
    const { root } = await newSpecPage({
      components: [CLPrice],
      html: '<cl-price></cl-price>'
    })
    expect(root).toEqualHtml(`
      <cl-price>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-price>
    `)
  })

  it('renders with a sku', async () => {
    const { root } = await newSpecPage({
      components: [CLPrice],
      html: '<cl-price sku="BACKPACK818488000000XXXX"></cl-price>'
    })
    expect(root).toEqualHtml(`
      <cl-price sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-price>
    `)
  })

  it('should pass-throw the "price Update" event to children', async () => {
    const { root, waitForChanges, doc } = await newSpecPage({
      components: [CLPrice],
      html: `
        <cl-price sku="BACKPACK818488000000XXXX">
          <cl-price-amount></cl-price-amount>
          <another-tag></another-tag>
        </cl-price>
      `
    })

    const priceUpdateEvent: Price = {
      id: 'ABC123',
      type: 'prices',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 28.50'
    }

    await waitForChanges()

    const clPrice = doc.querySelector('cl-price') ?? null
    const clPriceAmount = doc.querySelector('cl-price-amount') ?? null
    const anotherTag = doc.querySelector('another-tag') ?? null

    const clPriceAmountEventHandler = jest.fn()
    const anotherTagEventHandler = jest.fn()

    clPriceAmount?.addEventListener('priceUpdate', clPriceAmountEventHandler)
    anotherTag?.addEventListener('priceUpdate', anotherTagEventHandler)

    clPrice?.dispatchEvent(
      new CustomEvent<Price>('priceUpdate', {
        detail: priceUpdateEvent
      })
    )

    expect(clPriceAmountEventHandler).toHaveBeenCalledTimes(1)
    expect(clPriceAmountEventHandler.mock.calls[0][0]).toMatchObject({
      detail: priceUpdateEvent
    })

    expect(anotherTagEventHandler).not.toHaveBeenCalled()

    expect(root).toEqualHtml(`
      <cl-price sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-price-amount></cl-price-amount>
        <another-tag></another-tag>
      </cl-price>
    `)
  })
})
