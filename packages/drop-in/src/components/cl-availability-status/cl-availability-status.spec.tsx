import type { AvailabilityUpdateEventPayload, Sku } from '#apis/types'
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
          <cl-availability-status type="available-with-info">
            • available with info
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)

    const sku: Sku = {
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
        new CustomEvent<AvailabilityUpdateEventPayload>('availabilityUpdate', {
          detail: {
            sku,
            rule: 'cheapest',
            cartQuantity: 0
          }
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)
  })

  it('renders as available with info when product is available and has delivery lead times', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityStatus],
      html: `
        <div>
          <cl-availability-status type="available">
            • available
          </cl-availability-status>
          <cl-availability-status type="available-with-info">
            • available with info
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)

    const sku: Sku = {
      id: 'ABC123',
      code: 'ABC123',
      name: 'ABC123',
      type: 'skus',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      inventory: {
        available: true,
        quantity: 98,
        levels: [
          {
            delivery_lead_times: [
              {
                min: {
                  days: 5,
                  hours: 5 * 24
                },
                max: {
                  days: 10,
                  hours: 10 * 24
                },
                shipping_method: {
                  name: 'Standard',
                  reference: 'reference-1',
                  price_amount_cents: 700,
                  formatted_price_amount: '$7.00',
                  formatted_free_over_amount: null,
                  free_over_amount_cents: null
                }
              },
              {
                min: {
                  days: 6,
                  hours: 6 * 24
                },
                max: {
                  days: 7,
                  hours: 7 * 24
                },
                shipping_method: {
                  name: 'Express',
                  reference: 'reference-2',
                  price_amount_cents: 2000,
                  formatted_price_amount: '$20.00',
                  formatted_free_over_amount: null,
                  free_over_amount_cents: null
                }
              }
            ],
            quantity: 98
          }
        ]
      }
    }

    body.querySelectorAll('cl-availability-status').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<AvailabilityUpdateEventPayload>('availabilityUpdate', {
          detail: {
            sku,
            rule: 'cheapest',
            cartQuantity: 0
          }
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
        <cl-availability-status type="available-with-info">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • available with info
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
          <cl-availability-status type="available-with-info">
            • available with info
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)

    const sku: Sku = {
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
        new CustomEvent<AvailabilityUpdateEventPayload>('availabilityUpdate', {
          detail: {
            sku,
            rule: 'cheapest',
            cartQuantity: 0
          }
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
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

  it('renders as unavailable when item has less than available quantity (considering items in the cart)', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityStatus],
      html: `
        <div>
          <cl-availability-status type="available">
            • available
          </cl-availability-status>
          <cl-availability-status type="available-with-info">
            • available with info
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)

    const sku: Sku = {
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
        new CustomEvent<AvailabilityUpdateEventPayload>('availabilityUpdate', {
          detail: {
            sku,
            rule: 'cheapest',
            cartQuantity: 98
          }
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
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

  it('renders as empty when the SKU is undefined', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityStatus],
      html: `
        <div>
          <cl-availability-status type="available">
            • available
          </cl-availability-status>
          <cl-availability-status type="available-with-info">
            • available with info
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
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)

    const sku: Sku = {
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
        new CustomEvent<AvailabilityUpdateEventPayload>('availabilityUpdate', {
          detail: {
            sku,
            rule: 'cheapest',
            cartQuantity: 0
          }
        })
      )
    )

    await waitForChanges()

    body.querySelectorAll('cl-availability-status').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<AvailabilityUpdateEventPayload>('availabilityUpdate', {
          detail: undefined
        })
      )
    )

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-status aria-disabled="true" type="available">
          <mock:shadow-root></mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status type="available-with-info" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available with info
        </cl-availability-status>
        <cl-availability-status type="unavailable" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
      </div>
    `)
  })
})
