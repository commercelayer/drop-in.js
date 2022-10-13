import type { Price } from '@commercelayer/sdk'
import { newSpecPage } from '@stencil/core/testing'
import { CLPriceAmount } from './cl-price-amount'

describe('cl-price-amount.spec', () => {
  it('renders without any arguments', async () => {
    const { root } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount></cl-price-amount>'
    })

    expect(root).toEqualHtml(`
      <cl-price-amount type="price">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)
  })

  it('renders as compare_at when `type="compare-at"`', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount type="price"></cl-price-amount>'
    })

    expect(root).toEqualHtml(`
      <cl-price-amount type="price">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    const priceUpdateEvent: Price = {
      id: 'ABC123',
      type: 'prices',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 28.50'
    }

    root?.dispatchEvent(
      new CustomEvent<Price>('priceUpdate', {
        detail: priceUpdateEvent
      })
    )

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-price-amount type="price">
        <mock:shadow-root>
          € 12.00
        </mock:shadow-root>
      </cl-price-amount>
    `)
  })

  it('renders as compare_at when `type="compare-at"`', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount type="compare-at"></cl-price-amount>'
    })

    expect(root).toEqualHtml(`
      <cl-price-amount type="compare-at">
        <mock:shadow-root>
          <s part='strikethrough'></s>
        </mock:shadow-root>
      </cl-price-amount>
    `)

    const priceUpdateEvent: Price = {
      id: 'ABC123',
      type: 'prices',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 28.50'
    }

    root?.dispatchEvent(
      new CustomEvent<Price>('priceUpdate', {
        detail: priceUpdateEvent
      })
    )

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-price-amount type="compare-at">
        <mock:shadow-root>
          <s part='strikethrough'>€ 28.50</s>
        </mock:shadow-root>
      </cl-price-amount>
    `)
  })
})
