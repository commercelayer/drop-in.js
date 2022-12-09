import * as prices from '#apis/commercelayer/prices'
import { CLPriceAmount } from '#components/cl-price-amount/cl-price-amount'
import type { Price } from '@commercelayer/sdk'
import { newSpecPage } from '@stencil/core/testing'
import { CLPrice } from './cl-price'
import * as client from '#apis/commercelayer/client'

describe('cl-price.spec', () => {
  it('renders without attributes', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue('token-123')

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
    const fakePrice: Price = {
      id: 'ABC123',
      type: 'prices',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      formatted_amount: '€ 12.00',
      formatted_compare_at_amount: '€ 28.50'
    }

    jest.spyOn(prices, 'getPrice').mockResolvedValue(fakePrice)

    const { root } = await newSpecPage({
      components: [CLPrice, CLPriceAmount],
      html: `
        <cl-price code="SKU1234">
          <cl-price-amount></cl-price-amount>
          <another-tag></another-tag>
        </cl-price>
      `
    })

    expect(root).toEqualHtml(`
      <cl-price code="SKU1234">
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
})
