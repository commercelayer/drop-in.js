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
import "./cl-checkout-link"

beforeEach(() => {
  vi.resetAllMocks()
})

describe("cl-checkout-link.spec", () => {
  it("renders the checkout url without a cartId during the first load", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(
      <cl-checkout-link>Checkout</cl-checkout-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("aria-disabled"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-checkout-link aria-disabled="true" target="_self">
        <a target="_self">
          Checkout
        </a>
      </cl-checkout-link>
    `)
  })

  it("renders the checkout url with a defined checkoutUrl", async () => {
    vi.spyOn(cart, "getCheckoutUrl").mockResolvedValue("https://checkout.url")

    const { root, waitForChanges } = await render(
      <cl-checkout-link>Checkout</cl-checkout-link>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-checkout-link target="_self">
        <a target="_self" href="https://checkout.url">
          Checkout
        </a>
      </cl-checkout-link>
    `)
  })
})
