import * as skus from '#apis/commercelayer/skus'
import { ClAvailabilityStatus } from '#components/cl-availability-status/cl-availability-status'
import type { Sku } from '@commercelayer/sdk'
import { newSpecPage } from '@stencil/core/testing'
import { ClAvailability } from './cl-availability'

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

  it('renders with a sku', async () => {
    const { root } = await newSpecPage({
      components: [ClAvailability],
      html: '<cl-availability sku="BACKPACK818488000000XXXX"></cl-availability>'
    })
    expect(root).toEqualHtml(`
      <cl-availability sku="BACKPACK818488000000XXXX">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-availability>
    `)
  })

  it('should pass-throw the "skuUpdate" event to children', async () => {
    const fakeSku: Sku = {
      id: 'ABC123',
      type: 'skus',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      inventory: {
        available: true,
        quantity: 98
      }
    }

    jest.spyOn(skus, 'getSku').mockResolvedValue(fakeSku)

    const { root } = await newSpecPage({
      components: [ClAvailability, ClAvailabilityStatus],
      html: `
        <cl-availability sku="BACKPACKFFFFFF000000XXXX">
          <cl-availability-status></cl-availability-status>
          <cl-availability-status type="available">• available</cl-availability-status>
          <cl-availability-status type="unavailable">• out of stock</cl-availability-status>
          <another-tag></another-tag>
        </cl-availability>
      `
    })

    expect(root).toEqualHtml(`
      <cl-availability sku="BACKPACKFFFFFF000000XXXX">
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
