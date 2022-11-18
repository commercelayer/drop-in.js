import type { Sku } from '#apis/commercelayer/skus'
import { newSpecPage } from '@stencil/core/testing'
import { ClAvailabilityInfo } from './cl-availability-info'

describe('cl-availability-info.spec', () => {
  it('renders without attributes', async () => {
    const page = await newSpecPage({
      components: [ClAvailabilityInfo],
      html: `<cl-availability-info></cl-availability-info>`
    })
    expect(page.root).toEqualHtml(`
      <cl-availability-info>
        <mock:shadow-root></mock:shadow-root>
      </cl-availability-info>
    `)
  })

  it('renders the availability message when the product is available', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityInfo],
      html: `
        <div>
          <cl-availability-info type="min-days"></cl-availability-info>
          <cl-availability-info type="max-days"></cl-availability-info>
          <cl-availability-info type="min-hours"></cl-availability-info>
          <cl-availability-info type="max-hours"></cl-availability-info>
          <cl-availability-info type="shipping-method-name"></cl-availability-info>
          <cl-availability-info type="shipping-method-price"></cl-availability-info>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-info type="min-days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="min-hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-name">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-price">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
      </div>
    `)

    const availabilityUpdateEvent: Sku = {
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
                  price_amount_cents: 700,
                  formatted_price_amount: '$7.00',
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

    body.querySelectorAll('cl-availability-info').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<Sku>('availabilityUpdate', {
          detail: availabilityUpdateEvent
        })
      )
    )

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-info type="min-days">
          <mock:shadow-root>1</mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-days">
          <mock:shadow-root>2</mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="min-hours">
          <mock:shadow-root>24</mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-hours">
          <mock:shadow-root>48</mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-name">
          <mock:shadow-root>Standard</mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-price">
          <mock:shadow-root>$7.00</mock:shadow-root>
        </cl-availability-info>
      </div>
    `)
  })

  it('should not render the availability message when the product is unavailable', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClAvailabilityInfo],
      html: `
        <div>
          <cl-availability-info type="min-days"></cl-availability-info>
          <cl-availability-info type="max-days"></cl-availability-info>
          <cl-availability-info type="min-hours"></cl-availability-info>
          <cl-availability-info type="max-hours"></cl-availability-info>
          <cl-availability-info type="shipping-method-name"></cl-availability-info>
          <cl-availability-info type="shipping-method-price"></cl-availability-info>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-info type="min-days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="min-hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-name">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-price">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
      </div>
    `)

    const availabilityUpdateEvent: Sku = {
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

    body.querySelectorAll('cl-availability-info').forEach((element) =>
      element.dispatchEvent(
        new CustomEvent<Sku>('availabilityUpdate', {
          detail: availabilityUpdateEvent
        })
      )
    )

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
        <cl-availability-info type="min-days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-days">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="min-hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="max-hours">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-name">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
        <cl-availability-info type="shipping-method-price">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-info>
      </div>
    `)
  })
})
