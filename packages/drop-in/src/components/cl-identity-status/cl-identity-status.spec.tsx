// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import type { MockInstance } from "vitest"
import { vi } from "vitest"
import * as client from "@/apis/commercelayer/client"
import { fireEvent } from "@/apis/event"
import {
  mockedAccessToken,
  stripHydrationFlags,
  waitFor,
} from "@/testing/spec-helpers"
import * as logger from "@/utils/logger"
import "./cl-identity-status"

let log: MockInstance<typeof logger.log>

beforeEach(() => {
  vi.resetAllMocks()

  log = vi.spyOn(logger, "log")
})

describe("cl-identity-status.spec", () => {
  it("renders without any arguments", async () => {
    const { root, waitForChanges } = await render(
      <cl-identity-status type={undefined} />,
      {
        waitForReady: false,
      },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("aria-disabled"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-status aria-disabled="true">
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-status>
    `)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      "warn",
      '"type" attribute should be one of "guest", "customer". Received: "undefined"',
      root,
    )
  })

  it("renders as guest when user is guest", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(
      <div>
        <cl-identity-status type="guest">• i'm a guest</cl-identity-status>
        <cl-identity-status type="customer">
          • i'm a customer
        </cl-identity-status>
      </div>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <div>
        <cl-identity-status type="guest">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • i'm a guest
        </cl-identity-status>
        <cl-identity-status aria-disabled="true" type="customer">
          <mock:shadow-root></mock:shadow-root>
          • i'm a customer
        </cl-identity-status>
      </div>
    `)

    expect(log).not.toHaveBeenCalled()
  })

  it("renders as customer when user is customer", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "customer",
      ownerId: "1234",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(
      <div>
        <cl-identity-status type="guest">• i'm a guest</cl-identity-status>
        <cl-identity-status type="customer">
          • i'm a customer
        </cl-identity-status>
      </div>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <div>
        <cl-identity-status aria-disabled="true" type="guest">
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

  it("renders as customer when user logged in", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(
      <div>
        <cl-identity-status type="guest">• i'm a guest</cl-identity-status>
        <cl-identity-status type="customer">
          • i'm a customer
        </cl-identity-status>
      </div>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <div>
        <cl-identity-status type="guest">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • i'm a guest
        </cl-identity-status>
        <cl-identity-status aria-disabled="true" type="customer">
          <mock:shadow-root></mock:shadow-root>
          • i'm a customer
        </cl-identity-status>
      </div>
    `)

    fireEvent("cl-identity-gettoken", [], {
      ownerType: "customer",
      ownerId: "12as",
      accessToken: "token-1234",
      scope: "market:code:usa",
    })

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
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

  it("renders as guest when user logged out", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "customer",
      ownerId: "1234",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(
      <div>
        <cl-identity-status type="guest">• i'm a guest</cl-identity-status>
        <cl-identity-status type="customer">
          • i'm a customer
        </cl-identity-status>
      </div>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <div>
        <cl-identity-status aria-disabled="true" type="guest">
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

    fireEvent("cl-identity-gettoken", [], {
      ownerType: "guest",
      accessToken: "token-1234",
      scope: "market:code:usa",
    })

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
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
