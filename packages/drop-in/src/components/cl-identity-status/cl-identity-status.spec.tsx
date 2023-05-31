import { fireEvent } from '#apis/event'
import { newSpecPage } from '@stencil/core/testing'
import { ClIdentityStatus } from './cl-identity-status'

describe('cl-identity-status.spec', () => {
  it('renders without any arguments', async () => {
    const page = await newSpecPage({
      components: [ClIdentityStatus],
      html: `<cl-identity-status></cl-identity-status>`
    })

    expect(page.root).toEqualHtml(`
      <cl-identity-status aria-disabled="true">
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-status>
    `)
  })

  it('renders as guest when user is guest', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClIdentityStatus],
      html: `
        <div>
          <cl-identity-status type="guest">
            • i'm a guest
          </cl-identity-status>
          <cl-identity-status type="customer">
            • i'm a customer
          </cl-identity-status>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-identity-status type="guest">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • i'm a guest
        </cl-identity-status>
        <cl-identity-status type="customer" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • i'm a customer
        </cl-identity-status>
      </div>
    `)

    fireEvent('cl-identity-gettoken', [], {
      type: 'guest',
      accessToken: 'token-1234',
      scope: 'market:1234'
    })

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
        <cl-identity-status type="guest">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • i'm a guest
        </cl-identity-status>
        <cl-identity-status type="customer" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • i'm a customer
        </cl-identity-status>
      </div>
    `)
  })

  it('renders as customer when user is customer', async () => {
    const { body, waitForChanges } = await newSpecPage({
      components: [ClIdentityStatus],
      html: `
        <div>
          <cl-identity-status type="guest">
            • i'm a guest
          </cl-identity-status>
          <cl-identity-status type="customer">
            • i'm a customer
          </cl-identity-status>
        </div>
      `
    })

    expect(body).toEqualHtml(`
      <div>
        <cl-identity-status type="guest">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • i'm a guest
        </cl-identity-status>
        <cl-identity-status type="customer" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • i'm a customer
        </cl-identity-status>
      </div>
    `)

    fireEvent('cl-identity-gettoken', [], {
      type: 'customer',
      customerId: '12as',
      accessToken: 'token-1234',
      scope: 'market:1234'
    })

    await waitForChanges()

    expect(body).toEqualHtml(`
      <div>
        <cl-identity-status type="guest" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • i'm a guest
        </cl-identity-status>
        <cl-identity-status type="customer">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • i'm a customer
        </cl-identity-status>
      </div>
    `)
  })
})
