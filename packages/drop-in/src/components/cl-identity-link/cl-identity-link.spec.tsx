import * as client from '#apis/commercelayer/client'
import { newSpecPage } from '@stencil/core/testing'
import { ClIdentityLink } from './cl-identity-link'

beforeEach(() => {
  jest.resetAllMocks()
})

describe('cl-identity-link.spec', () => {
  it('renders empty when type is not specified', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link>Login</cl-identity-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-identity-link aria-disabled="true" target="_self">
        <mock:shadow-root></mock:shadow-root>
        Login
      </cl-identity-link>
    `)
  })

  it('renders the identity when type="login"', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link type="login">Login</cl-identity-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-identity-link type="login" target="_self">
        <mock:shadow-root>
          <a href="https://drop-in-js.commercelayer.app/identity/login?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&amp;scope=market:11709&amp;returnUrl=http://testing.stenciljs.com/" part="a" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Login
      </cl-identity-link>
    `)
  })

  it('renders the identity when type="sign-up"', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link type="sign-up">Sign Up</cl-identity-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-identity-link type="sign-up" target="_self">
        <mock:shadow-root>
          <a href="https://drop-in-js.commercelayer.app/identity/sign-up?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&amp;scope=market:11709&amp;returnUrl=http://testing.stenciljs.com/" part="a" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Sign Up
      </cl-identity-link>
    `)
  })

  it('renders the identity when type="logout"', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken: 'token-123',
      scope: 'market:1234'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link type="logout">Logout</cl-identity-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-identity-link type="logout" target="_self">
        <mock:shadow-root>
          <a href="https://drop-in-js.commercelayer.app/identity/logout?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&amp;scope=market:11709&amp;returnUrl=http://testing.stenciljs.com/" part="a" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Logout
      </cl-identity-link>
    `)
  })
})
