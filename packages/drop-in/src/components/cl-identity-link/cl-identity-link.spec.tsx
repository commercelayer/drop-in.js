import * as client from '#apis/commercelayer/client'
import * as config from '#apis/commercelayer/config'
import * as logger from '#utils/logger'
import { newSpecPage } from '@stencil/core/testing'
import { mockedAccessToken } from 'jest.spec.helpers'
import { ClIdentityLink } from './cl-identity-link'

let log: jest.SpyInstance

beforeEach(() => {
  jest.resetAllMocks()

  jest.spyOn(client, 'getAccessToken').mockResolvedValue({
    type: 'guest',
    accessToken: mockedAccessToken,
    scope: 'market:code:usa'
  })

  jest.spyOn(config, 'getOrganizationConfig').mockResolvedValue({
    links: {
      my_account:
        'https://drop-in-js.commercelayer.app/my-account?accessToken=:access_token',
      identity: 'https://drop-in-js.commercelayer.app/identity',
      cart: 'https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=:access_token',
      checkout:
        'https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=:access_token'
    }
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
        <a target="_self">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "signup", "logout". Received: "undefined"',
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
        <a href="https://drop-in-js.commercelayer.app/identity/login?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&amp;scope=market:code:usa&amp;returnUrl=http://testing.stenciljs.com/" target="_self">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it('renders the identity link when type="signup"', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [ClIdentityLink],
      html: '<cl-identity-link type="signup">Sign Up</cl-identity-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-identity-link type="signup" target="_self">
        <a href="https://drop-in-js.commercelayer.app/identity/signup?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&amp;scope=market:code:usa&amp;returnUrl=http://testing.stenciljs.com/" target="_self">
          Sign Up
        </a>
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
        <a href="#" target="_self">
          Logout
        </a>
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
        <a href="https://drop-in-js.commercelayer.app/identity/login?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&amp;scope=market:code:usa&amp;returnUrl=http://testing.stenciljs.com/" target="_self">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "signup", "logout". Received: "undefined"',
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
        <a target="_self">
         Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "signup", "logout". Received: "john"',
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
        <a target="_self">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(2)

    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "signup", "logout". Received: "undefined"',
      root
    )

    expect(log).toHaveBeenCalledWith(
      'warn',
      '"type" attribute should be one of "login", "signup", "logout". Received: "john"',
      root
    )
  })
})
