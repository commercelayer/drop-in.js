import * as skus from '#apis/commercelayer/skus'
import { ClAvailabilityStatus } from '#components/cl-availability-status/cl-availability-status'
import { newSpecPage } from '@stencil/core/testing'
import { ClAvailability } from './cl-availability'

const baseSku = (
  id: string
): Pick<skus.Sku, 'id' | 'type' | 'created_at' | 'updated_at'> => {
  return {
    id,
    type: 'skus',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as const
}

const skuList: { [code: string]: skus.Sku } = {
  AVAILABLE123: {
    ...baseSku('AVAILABLE123'),
    inventory: {
      levels: [],
      available: true,
      quantity: 98
    }
  },
  NOTAVAILABLE456: {
    ...baseSku('NOTAVAILABLE456'),
    inventory: {
      levels: [],
      available: false,
      quantity: 0
    }
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
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root } = await newSpecPage({
      components: [ClAvailability],
      html: '<cl-availability code="AVAILABLE123"></cl-availability>'
    })
    expect(root).toEqualHtml(`
      <cl-availability code="AVAILABLE123">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-availability>
    `)
  })

  it('should pass-throw the "availabilityUpdate" event to children', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root } = await newSpecPage({
      components: [ClAvailability, ClAvailabilityStatus],
      html: `
        <cl-availability code="AVAILABLE123">
          <cl-availability-status></cl-availability-status>
          <cl-availability-status type="available">• available</cl-availability-status>
          <cl-availability-status type="unavailable">• out of stock</cl-availability-status>
          <another-tag></another-tag>
        </cl-availability>
      `
    })

    expect(root).toEqualHtml(`
      <cl-availability code="AVAILABLE123">
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

  it('should fetch the new availability when "code" changes', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [ClAvailability, ClAvailabilityStatus],
      html: `
        <cl-availability code="AVAILABLE123">
          <cl-availability-status></cl-availability-status>
          <cl-availability-status type="available">• available</cl-availability-status>
          <cl-availability-status type="unavailable">• out of stock</cl-availability-status>
          <another-tag></another-tag>
        </cl-availability>
      `
    })

    root?.setAttribute('code', 'NOTAVAILABLE456')

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-availability code="NOTAVAILABLE456">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-availability-status aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-status>
        <cl-availability-status type="available" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • out of stock
        </cl-availability-status>
        <another-tag></another-tag>
    </cl-availability>
    `)
  })
})
