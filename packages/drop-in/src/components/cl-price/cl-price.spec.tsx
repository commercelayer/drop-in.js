import * as client from '#apis/commercelayer/client'
import * as prices from '#apis/commercelayer/prices'
import { CLPriceAmount } from '#components/cl-price-amount/cl-price-amount'
import type { Price } from '@commercelayer/sdk'
import { newSpecPage } from '@stencil/core/testing'
import { CLPrice } from './cl-price'

const fakePrices: { [sku: string]: Price } = {
  ABC123: {
    id: 'ABC123',
    type: 'prices',
    amount_cents: 1200,
    amount_float: 12,
    compare_at_amount_cents: 2850,
    compare_at_amount_float: 28.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    formatted_amount: '€ 12.00',
    formatted_compare_at_amount: '€ 28.50'
  },
  DEF456: {
    id: 'DEF456',
    type: 'prices',
    amount_cents: 3100,
    amount_float: 31,
    compare_at_amount_cents: 4300,
    compare_at_amount_float: 43,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    formatted_amount: '€ 31.00',
    formatted_compare_at_amount: '€ 43.00'
  }
}

describe('cl-price.spec', () => {
  it('renders without attributes', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

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

  it('should pass-throw the "priceUpdate" event to children', async () => {
    jest
      .spyOn(prices, 'getPrice')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(fakePrices[sku])
      )

    const { root } = await newSpecPage({
      components: [CLPrice, CLPriceAmount],
      html: `
        <cl-price code="ABC123">
          <cl-price-amount></cl-price-amount>
          <another-tag></another-tag>
        </cl-price>
      `
    })

    expect(root).toEqualHtml(`
      <cl-price code="ABC123">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-price-amount type="price">
          <mock:shadow-root>
            €&nbsp;12.00
          </mock:shadow-root>
        </cl-price-amount>
        <another-tag></another-tag>
    </cl-price>
    `)
  })

  it('should fetch the new price when "code" changes', async () => {
    jest
      .spyOn(prices, 'getPrice')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(fakePrices[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [CLPrice, CLPriceAmount],
      html: `
        <cl-price code="ABC123">
          <cl-price-amount></cl-price-amount>
          <another-tag></another-tag>
        </cl-price>
      `
    })

    root?.setAttribute('code', 'DEF456')

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-price code="DEF456">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-price-amount type="price">
          <mock:shadow-root>
            €&nbsp;31.00
          </mock:shadow-root>
        </cl-price-amount>
        <another-tag></another-tag>
    </cl-price>
    `)
  })
})
