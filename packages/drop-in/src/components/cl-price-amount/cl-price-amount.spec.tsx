import type { Core } from '@commercelayer/js-sdk'
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

  it('renders as formatted_amount when `type="price"`', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount type="price"></cl-price-amount>'
    })

    expect(root).toEqualHtml(`
      <cl-price-amount type="price">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    const priceUpdateEvent: Core.Price = {
      id: 'ABC123',
      type: 'prices',
      amount_cents: 1200,
      amount_float: 12,
      compare_at_amount_cents: 2850,
      compare_at_amount_float: 28.5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 28.50'
    } as unknown as Core.Price

    root?.dispatchEvent(
      new CustomEvent<Core.Price>('priceUpdate', {
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

  it('renders as formatted_compare_at_amount when `type="compare-at"`', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount type="compare-at"></cl-price-amount>'
    })

    expect(root).toEqualHtml(`
      <cl-price-amount type="compare-at">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    const priceUpdateEvent: Core.Price = {
      id: 'ABC123',
      type: 'prices',
      amount_cents: 1200,
      amount_float: 12,
      compare_at_amount_cents: 2850,
      compare_at_amount_float: 28.5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 28.50'
    } as unknown as Core.Price

    root?.dispatchEvent(
      new CustomEvent<Core.Price>('priceUpdate', {
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

  it('renders as empty box when `type="compare-at"` and there is no a compare-at amount', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount type="compare-at"></cl-price-amount>'
    })

    expect(root).toEqualHtml(`
      <cl-price-amount type="compare-at">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    const priceUpdateEvent: Core.Price = {
      id: 'ABC123',
      type: 'prices',
      amount_cents: 1200,
      amount_float: 12,
      compare_at_amount_cents: 1200,
      compare_at_amount_float: 12,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 12.00'
    } as unknown as Core.Price

    root?.dispatchEvent(
      new CustomEvent<Core.Price>('priceUpdate', {
        detail: priceUpdateEvent
      })
    )

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-price-amount type="compare-at">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)
  })

  it('renders as empty when the Price is undefined', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [CLPriceAmount],
      html: '<cl-price-amount type="price"></cl-price-amount>'
    })

    expect(root).toEqualHtml(`
      <cl-price-amount type="price">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)

    const priceUpdateEvent: Core.Price = {
      id: 'ABC123',
      type: 'prices',
      amount_cents: 1200,
      amount_float: 12,
      compare_at_amount_cents: 2850,
      compare_at_amount_float: 28.5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 28.50'
    } as unknown as Core.Price

    root?.dispatchEvent(
      new CustomEvent<Core.Price>('priceUpdate', {
        detail: priceUpdateEvent
      })
    )

    await waitForChanges()

    root?.dispatchEvent(
      new CustomEvent<Core.Price>('priceUpdate', {
        detail: undefined
      })
    )

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-price-amount type="price">
        <mock:shadow-root></mock:shadow-root>
      </cl-price-amount>
    `)
  })
})
