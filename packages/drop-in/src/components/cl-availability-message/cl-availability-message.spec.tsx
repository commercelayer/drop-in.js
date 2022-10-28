import type { Sku } from '#apis/commercelayer/skus'
import { newSpecPage } from '@stencil/core/testing'
import { ClAvailabilityMessage } from './cl-availability-message'

describe('cl-availability-message', () => {
  it('renders without attributes', async () => {
    const page = await newSpecPage({
      components: [ClAvailabilityMessage],
      html: `<cl-availability-message></cl-availability-message>`
    })
    expect(page.root).toEqualHtml(`
      <cl-availability-message>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-message>
    `)
  })

  it('renders the availability message when the product is available', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityMessage],
      html: `
        <div>
          <cl-availability-message format="days" message="shipped in {min}-{max} days"></cl-availability-message>
          <cl-availability-message format="hours" message="shipped in {min}-{max} hours"></cl-availability-message>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-message format="days" message="shipped in {min}-{max} days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-message>
        <cl-availability-message format="hours" message="shipped in {min}-{max} hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-message>
      </div>
    `)

    const skuUpdateEvent: Sku = {
      id: 'ABC123',
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
                  days: 1,
                  hours: 1 * 24
                },
                max: {
                  days: 2,
                  hours: 2 * 24
                },
                shipping_method: {
                  name: 'Standard',
                  reference: 'reference-1',
                  price_amount_cents: 100,
                  formatted_price_amount: '100$',
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

    body.querySelectorAll('cl-availability-message').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<Sku>('skuUpdate', {
          detail: skuUpdateEvent
        })
      )
    )

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-message format="days" message="shipped in {min}-{max} days">
          <mock:shadow-root>
            shipped in 1-2 days
          </mock:shadow-root>
        </cl-availability-message>
        <cl-availability-message format="hours" message="shipped in {min}-{max} hours">
          <mock:shadow-root>
            shipped in 24-48 hours
          </mock:shadow-root>
        </cl-availability-message>
      </div>
    `)
  })

  it('should not render the availability message when the product is unavailable', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityMessage],
      html: `
        <div>
          <cl-availability-message format="days" message="shipped in {min}-{max} days"></cl-availability-message>
          <cl-availability-message format="hours" message="shipped in {min}-{max} hours"></cl-availability-message>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-message format="days" message="shipped in {min}-{max} days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-message>
        <cl-availability-message format="hours" message="shipped in {min}-{max} hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-message>
      </div>
    `)

    const skuUpdateEvent: Sku = {
      id: 'ABC123',
      type: 'skus',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      inventory: {
        available: false,
        quantity: 0,
        levels: []
      }
    }

    body.querySelectorAll('cl-availability-message').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<Sku>('skuUpdate', {
          detail: skuUpdateEvent
        })
      )
    )

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-message format="days" message="shipped in {min}-{max} days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-message>
        <cl-availability-message format="hours" message="shipped in {min}-{max} hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-message>
      </div>
    `)
  })
})
