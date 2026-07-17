// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import type { MockInstance } from "vitest"
import { vi } from "vitest"
import * as client from "@/apis/commercelayer/client"
import * as config from "@/apis/commercelayer/config"
import {
  mockedAccessToken,
  stripHydrationFlags,
  waitFor,
} from "@/testing/spec-helpers"
import * as logger from "@/utils/logger"
import "./cl-identity-link"

let log: MockInstance<typeof logger.log>

beforeEach(() => {
  vi.resetAllMocks()

  vi.spyOn(client, "getAccessToken").mockResolvedValue({
    ownerType: "guest",
    accessToken: mockedAccessToken,
    scope: "market:code:usa",
  })

  vi.spyOn(config, "getOrganization").mockResolvedValue({
    type: "organizations",
    id: "org_123",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  })

  log = vi.spyOn(logger, "log")
})

describe("cl-identity-link.spec", () => {
  it("renders empty when type is not specified", async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link type={undefined}>Login</cl-identity-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link aria-disabled="true" target="_self">
        <a target="_self">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      "warn",
      '"type" attribute should be one of "login", "signup", "logout". Received: "undefined"',
      root,
    )
  })

  it('renders the identity link when type="login"', async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link type="login">Login</cl-identity-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      return root.querySelector("a")?.hasAttribute("href") ?? false
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link target="_self" type="login">
        <a target="_self" href="https://drop-in-js.commercelayer.app/identity/login?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&scope=market:code:usa&publicScope=market:code:usa&lang=en&returnUrl=http://example.com">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it('renders the identity link with the resetPasswordUrl when type="login"', async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link
        type="login"
        reset-password-url="https://example.com/reset-password"
      >
        Login
      </cl-identity-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      return root.querySelector("a")?.hasAttribute("href") ?? false
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link reset-password-url="https://example.com/reset-password" target="_self" type="login">
        <a target="_self" href="https://drop-in-js.commercelayer.app/identity/login?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&scope=market:code:usa&publicScope=market:code:usa&lang=en&returnUrl=http://example.com&resetPasswordUrl=https://example.com/reset-password">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it('renders the identity link when type="signup"', async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link type="signup">Sign Up</cl-identity-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      return root.querySelector("a")?.hasAttribute("href") ?? false
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link target="_self" type="signup">
        <a target="_self" href="https://drop-in-js.commercelayer.app/identity/signup?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&scope=market:code:usa&publicScope=market:code:usa&lang=en&returnUrl=http://example.com">
          Sign Up
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it('renders the identity link when type="logout"', async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link type="logout">Logout</cl-identity-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      return root.querySelector("a")?.hasAttribute("href") ?? false
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link target="_self" type="logout">
        <a target="_self" href="#">
          Logout
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it("renders the identity link with a different scope", async () => {
    const { root, waitForChanges } = await render(
      // biome-ignore lint/a11y/noHeaderScope: "scope" here is cl-identity-link's own prop, not the table-header HTML attribute
      <cl-identity-link type="login" scope="market:code:usa-employees">
        Login
      </cl-identity-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      return root.querySelector("a")?.hasAttribute("href") ?? false
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link target="_self" type="login" scope="market:code:usa-employees">
        <a target="_self" href="https://drop-in-js.commercelayer.app/identity/login?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&scope=market:code:usa-employees&publicScope=market:code:usa&lang=en&returnUrl=http://example.com">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(0)
    expect(log).not.toHaveBeenCalled()
  })

  it("renders the identity link when type changes from invalid to a valid value", async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link type={undefined}>Login</cl-identity-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    root.setAttribute("type", "login")
    await waitFor(waitForChanges, () => {
      return root.querySelector("a")?.hasAttribute("href") ?? false
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link target="_self" type="login">
        <a target="_self" href="https://drop-in-js.commercelayer.app/identity/login?clientId=kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8&scope=market:code:usa&publicScope=market:code:usa&lang=en&returnUrl=http://example.com">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      "warn",
      '"type" attribute should be one of "login", "signup", "logout". Received: "undefined"',
      root,
    )
  })

  it("renders empty when type changes from valid to an invalid value", async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link type="login">Login</cl-identity-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      return root.querySelector("a")?.hasAttribute("href") ?? false
    })

    root.setAttribute("type", "john")
    await waitFor(waitForChanges, () => {
      return !(root.querySelector("a")?.hasAttribute("href") ?? false)
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link target="_self" type="john" aria-disabled="true">
        <a target="_self">
         Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      "warn",
      '"type" attribute should be one of "login", "signup", "logout". Received: "john"',
      root,
    )
  })

  it("renders empty when type changes from invalid to an invalid value", async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-link type={undefined}>Login</cl-identity-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    root.setAttribute("type", "john")
    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-link aria-disabled="true" target="_self" type="john">
        <a target="_self">
          Login
        </a>
      </cl-identity-link>
    `)

    expect(log).toHaveBeenCalledTimes(2)

    expect(log).toHaveBeenCalledWith(
      "warn",
      '"type" attribute should be one of "login", "signup", "logout". Received: "undefined"',
      root,
    )

    expect(log).toHaveBeenCalledWith(
      "warn",
      '"type" attribute should be one of "login", "signup", "logout". Received: "john"',
      root,
    )
  })
})
