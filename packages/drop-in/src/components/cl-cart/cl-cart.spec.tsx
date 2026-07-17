// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import { vi } from "vitest"
import * as cart from "@/apis/commercelayer/cart"
import * as client from "@/apis/commercelayer/client"
import {
  mockedAccessToken,
  stripHydrationFlags,
  waitFor,
} from "@/testing/spec-helpers"
import "@/components/cl-cart-link/cl-cart-link"
import "./cl-cart"

beforeEach(() => {
  vi.resetAllMocks()
})

describe("cl-cart.spec", () => {
  it("renders", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    vi.spyOn(cart, "getCartUrl").mockResolvedValue(
      "https://example.com/checkout-url",
    )

    const { root, waitForChanges, unmount } = await render(<cl-cart />, {
      waitForReady: false,
    })

    await waitFor(
      waitForChanges,
      () =>
        root.shadowRoot?.querySelector("iframe")?.hasAttribute("src") ?? false,
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart>
        <mock:shadow-root>
          <div part="container">
            <iframe
              part="iframe"
              title="My Cart"
              allow="payment"
              src="https://example.com/checkout-url"
              id="iFrameResizer0"></iframe>
          </div>
        </mock:shadow-root>
      </cl-cart>
    `)

    unmount()
  })

  it("renders as minicart when used inside a `cl-cart-link`.", async () => {
    vi.spyOn(cart, "getCartUrl").mockResolvedValue(
      "https://example.com/checkout-url",
    )

    const { root, waitForChanges } = await render(
      <cl-cart-link>
        <span>Cart</span>
        <cl-cart></cl-cart>
      </cl-cart-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    const minicarts = document.querySelectorAll("cl-cart")
    const minicart = minicarts[minicarts.length - 1]
    if (minicart == null) {
      throw new Error("cl-cart minicart was not moved to document.body")
    }

    await waitFor(
      waitForChanges,
      () =>
        minicart.shadowRoot?.querySelector("iframe")?.hasAttribute("id") ??
        false,
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-link role="button" tabindex="0" target="_self">
        <span>
          Cart
        </span>
      </cl-cart-link>
    `)

    stripHydrationFlags(minicart)
    await expect(minicart).toEqualHtml(`
      <cl-cart aria-hidden="true" tabindex="-1" type="mini">
        <mock:shadow-root>
          <div part="container">
            <button type="button" aria-label="Close" part="close-button">
              Close
            </button>
            <iframe
              part="iframe"
              title="My Cart"
              allow="payment"
              id="iFrameResizer1"></iframe>
          </div>
        </mock:shadow-root>
      </cl-cart>
    `)

    root.click()

    await waitFor(
      waitForChanges,
      () =>
        minicart.shadowRoot?.querySelector("iframe")?.hasAttribute("src") ??
        false,
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-link role="button" tabindex="0" target="_self">
        <span>
          Cart
        </span>
      </cl-cart-link>
    `)

    stripHydrationFlags(minicart)
    await expect(minicart).toEqualHtml(`
      <cl-cart type="mini" role="alertdialog" aria-modal="true" open>
        <mock:shadow-root>
          <div part="container">
            <button type="button" aria-label="Close" part="close-button">
              Close
            </button>
            <iframe
              part="iframe"
              title="My Cart"
              allow="payment"
              id="iFrameResizer1"
              src="https://example.com/checkout-url"></iframe>
          </div>
        </mock:shadow-root>
      </cl-cart>
    `)
  })
})
