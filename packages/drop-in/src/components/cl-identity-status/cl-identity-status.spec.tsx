import * as client from '#apis/commercelayer/client'
import { fireEvent } from '#apis/event'
import * as logger from '#utils/logger'
import { newSpecPage } from '@stencil/core/testing'
import { mockedAccessToken } from 'jest.spec.helpers'
import { ClIdentityStatus } from './cl-identity-status'

let log: jest.SpyInstance

beforeEach(() => {
  jest.resetAllMocks()

  log = jest.spyOn(logger, 'log')
})

describe('cl-identity-status.spec', () => {
  it('renders without any arguments', async () => {
    const { root } = await newSpecPage({
      components: [ClIdentityStatus],
      html: `<cl-identity-status></cl-identity-status>`
    })

    expect(root).toEqualHtml(`
      <cl-identity-status aria-disabled="true">
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-status>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "guest", "customer". Received: "undefined"',
      root
    )
  })

  it('renders as guest when user is guest', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: mockedAccessToken,
      scope: 'market:code:usa'
    })

    const { body } = await newSpecPage({
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

    expect(log).not.toHaveBeenCalled()
  })

  it('renders as customer when user is customer', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'customer',
      customerId: '1234',
      accessToken: mockedAccessToken,
      scope: 'market:code:usa'
    })

    const { body } = await newSpecPage({
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

    expect(log).not.toHaveBeenCalled()
  })

  it('renders as customer when user logged in', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: mockedAccessToken,
      scope: 'market:code:usa'
    })

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
      scope: 'market:code:usa'
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

    expect(log).not.toHaveBeenCalled()
  })

  it('renders as guest when user logged out', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'customer',
      customerId: '1234',
      accessToken: mockedAccessToken,
      scope: 'market:code:usa'
    })

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

    fireEvent('cl-identity-gettoken', [], {
      type: 'guest',
      accessToken: 'token-1234',
      scope: 'market:code:usa'
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

    expect(log).not.toHaveBeenCalled()
  })
})
