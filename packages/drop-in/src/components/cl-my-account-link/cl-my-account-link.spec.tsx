import * as client from '#apis/commercelayer/client'
import { newSpecPage } from '@stencil/core/testing'
import { ClMyAccountLink } from './cl-my-account-link'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-my-account-link.spec', () => {
  it('renders the my-account url during the first load', async () => {
    const fakeAccessToken = 'token-123'

    jest.spyOn(client, 'getAccessToken').mockResolvedValue(fakeAccessToken)

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link>My Account</cl-my-account-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link target="_self">
        <mock:shadow-root>
          <a part="a" href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        My Account
      </cl-my-account-link>
    `)
  })

  it('renders the my-account url with a defined target', async () => {
    const fakeAccessToken = 'token-123'

    jest.spyOn(client, 'getAccessToken').mockResolvedValue(fakeAccessToken)

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link target="_blank">My Account</cl-my-account-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank">
        <mock:shadow-root>
          <a part="a" href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123" target="_blank">
            <slot></slot>
          </a>
        </mock:shadow-root>
        My Account
      </cl-my-account-link>
    `)
  })
})
