import type { Sku } from '#apis/types'
import { newSpecPage } from '@stencil/core/testing'
import { ClAvailabilityStatus } from './cl-availability-status'

describe('cl-availability-status.spec', () => {
  it('renders without any arguments', async () => {
    const page = await newSpecPage({
      components: [ClAvailabilityStatus],
      html: `<cl-availability-status></cl-availability-status>`
    })

    expect(page.root).toEqualHtml(`
      <cl-availability-status aria-disabled="true">
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-status>
    `)
  })

  it('renders as available when product is available', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityStatus],
      html: `
        <div>
          <cl-availability-status type="available">
            • available
          </cl-availability-status>
          <cl-availability-status type="unavailable">
            • out of stock
          </cl-availability-status>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-status type="available" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)

    const availabilityUpdateEvent: Sku = {
      id: 'ABC123',
      code: 'ABC123',
      name: 'ABC123',
      type: 'skus',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      inventory: {
        available: true,
        quantity: 98,
        levels: []
      }
    }

    body.querySelectorAll('cl-availability-status').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<Sku>('availabilityUpdate', {
          detail: availabilityUpdateEvent
        })
      )
    )

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
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
      </div>
    `)
  })

  it('renders as unavailable when product is out of stock', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityStatus],
      html: `
        <div>
          <cl-availability-status type="available">
            • available
          </cl-availability-status>
          <cl-availability-status type="unavailable">
            • out of stock
          </cl-availability-status>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-status type="available" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)

    const availabilityUpdateEvent: Sku = {
      id: 'ABC123',
      code: 'ABC123',
      name: 'ABC123',
      type: 'skus',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      inventory: {
        available: false,
        quantity: 0,
        levels: []
      }
    }

    body.querySelectorAll('cl-availability-status').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<Sku>('availabilityUpdate', {
          detail: availabilityUpdateEvent
        })
      )
    )

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
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
      </div>
    `)
  })
})
