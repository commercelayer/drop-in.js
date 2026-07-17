// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import { vi } from "vitest"
import * as client from "@/apis/commercelayer/client"
import * as config from "@/apis/commercelayer/config"
import { fireEvent } from "@/apis/event"
import { mockedAccessToken, stripHydrationFlags } from "@/testing/spec-helpers"
import "./cl-my-account-link"

beforeEach(() => {
  vi.resetAllMocks()
})

describe("cl-my-account-link.spec", () => {
  it("renders the my-account without href when guest", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    vi.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await render(
      <cl-my-account-link>My Account</cl-my-account-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_self">
        <a target="_self">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it("renders the my-account with a defined target", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    vi.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await render(
      <cl-my-account-link target="_blank">My Account</cl-my-account-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_blank">
        <a target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it("renders the my-account url when user is logged in", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "customer",
      ownerId: "1234",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    vi.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123&lang=en",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await render(
      <cl-my-account-link target="_blank">My Account</cl-my-account-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank">
        <a target="_blank" href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123&lang=en">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it("renders the my-account without href when user logged out", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "customer",
      ownerId: "1234",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    vi.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123&lang=en",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await render(
      <cl-my-account-link target="_blank">My Account</cl-my-account-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank">
        <a target="_blank" href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123&lang=en">
          My Account
        </a>
      </cl-my-account-link>
    `)

    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: "token-1234",
      scope: "market:code:usa",
    })
    fireEvent("cl-identity-gettoken", [], {
      ownerType: "guest",
      accessToken: "token-1234",
      scope: "market:code:usa",
    })

    await waitForChanges()
    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank" aria-disabled="true">
        <a target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })
})
