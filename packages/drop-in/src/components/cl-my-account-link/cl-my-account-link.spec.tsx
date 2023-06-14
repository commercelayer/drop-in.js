import * as client from '#apis/commercelayer/client'
import { fireEvent } from '#apis/event'
import { newSpecPage } from '@stencil/core/testing'
import { ClMyAccountLink } from './cl-my-account-link'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-my-account-link.spec', () => {
  it('renders the my-account without href when guest', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link>My Account</cl-my-account-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_self">
        <a target="_self">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it('renders the my-account with a defined target', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link target="_blank">My Account</cl-my-account-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_blank">
        <a target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it('renders the my-account url when user is logged in', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'customer',
      customerId: '1234',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link target="_blank">My Account</cl-my-account-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank">
        <a href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123" target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it('renders the my-account without href when user logged out', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'customer',
      customerId: '1234',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link target="_blank">My Account</cl-my-account-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank">
        <a href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123" target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)

    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-1234',
      scope: 'market:1234'
    })
    fireEvent('cl-identity-gettoken', [], {
      type: 'guest',
      accessToken: 'token-1234',
      scope: 'market:1234'
    })

    await waitForChanges()
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_blank">
        <a target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })
})
