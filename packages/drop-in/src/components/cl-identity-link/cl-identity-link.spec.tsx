import * as client from '#apis/commercelayer/client'
import { newSpecPage } from '@stencil/core/testing'
import { ClIdentityLink } from './cl-identity-link'
import * as logger from '#utils/logger'

let log: jest.SpyInstance

beforeEach(() => {
  jest.resetAllMocks()

  jest.spyOn(client, 'getAccessToken').mockResolvedValue({
    type: 'guest',
    accessToken: 'token-123',
    scope: 'market:1234'
  })

  log = jest.spyOn(logger, 'log')
})

describe('cl-identity-link.spec', () => {
  it('renders empty when type is not specified', async () => {
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

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "sign-up", "logout". Received: "undefined"',
      root
    )
  })

  it('renders the identity link when type="login"', async () => {
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

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it('renders the identity link when type="sign-up"', async () => {
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

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it('renders the identity link when type="logout"', async () => {
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

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it('renders the identity link when type changes from invalid to a valid value', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link>Login</cl-identity-link>'
    })

    await waitForChanges()

    root?.setAttribute('type', 'login')
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

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "sign-up", "logout". Received: "undefined"',
      root
    )
  })

  it('renders empty when type changes from valid to an invalid value', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link type="login">Login</cl-identity-link>'
    })

    await waitForChanges()

    root?.setAttribute('type', 'john')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-identity-link type="john" aria-disabled="true" target="_self">
        <mock:shadow-root></mock:shadow-root>
        Login
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "sign-up", "logout". Received: "john"',
      root
    )
  })

  it('renders empty when type changes from invalid to an invalid value', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link>Login</cl-identity-link>'
    })

    await waitForChanges()

    root?.setAttribute('type', 'john')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-identity-link type="john" aria-disabled="true" target="_self">
        <mock:shadow-root></mock:shadow-root>
        Login
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(2)

    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "sign-up", "logout". Received: "undefined"',
      root
    )

    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "sign-up", "logout". Received: "john"',
      root
    )
  })
})
