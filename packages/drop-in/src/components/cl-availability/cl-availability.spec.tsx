import * as skus from '#apis/commercelayer/skus'
import { ClAvailabilityStatus } from '#components/cl-availability-status/cl-availability-status'
import { newSpecPage } from '@stencil/core/testing'
import { ClAvailability } from './cl-availability'

const baseSku = {
  id: 'id1234',
  type: 'skus',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
} as const

const availableSku: skus.Sku = {
  ...baseSku,
  inventory: {
    levels: [],
    available: true,
    quantity: 98
  }
}

describe('cl-availability.spec', () => {
  it('renders without attributes', async () => {
    const page = await newSpecPage({
      components: [ClAvailability],
      html: `<cl-availability></cl-availability>`
    })
    expect(page.root).toEqualHtml(`
      <cl-availability>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-availability>
    `)
  })

  it('renders with a code', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(availableSku)

    const { root } = await newSpecPage({
      components: [ClAvailability],
      html: '<cl-availability code="SKU1234"></cl-availability>'
    })
    expect(root).toEqualHtml(`
      <cl-availability code="SKU1234">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-availability>
    `)
  })

  it('should pass-throw the "availabilityUpdate" event to children', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(availableSku)

    const { root } = await newSpecPage({
      components: [ClAvailability, ClAvailabilityStatus],
      html: `
        <cl-availability code="SKU1234">
          <cl-availability-status></cl-availability-status>
          <cl-availability-status type="available">• available</cl-availability-status>
          <cl-availability-status type="unavailable">• out of stock</cl-availability-status>
          <another-tag></another-tag>
        </cl-availability>
      `
    })

    expect(root).toEqualHtml(`
      <cl-availability code="SKU1234">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-availability-status aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-status>
        <cl-availability-status type="available">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
        <another-tag></another-tag>
    </cl-availability>
    `)
  })
})
