// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import { vi } from "vitest"
import * as client from "@/apis/commercelayer/client"
import type { CLCustomEventDetailMap } from "@/apis/event"
import {
  mockedAccessToken,
  stripHydrationFlags,
  waitFor,
} from "@/testing/spec-helpers"
import "./cl-cart-count"

afterEach(() => {
  vi.restoreAllMocks()
})

describe("cl-cart-count.spec", () => {
  it("renders", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(<cl-cart-count />, {
      waitForReady: false,
    })

    await waitFor(
      waitForChanges,
      () => root.shadowRoot?.textContent?.trim() === "0",
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-count>
        <mock:shadow-root>
          0
        </mock:shadow-root>
      </cl-cart-count>
    `)
  })

  it('renders without content when "hide-when-empty" attribute is set to `true`', async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(
      <cl-cart-count hide-when-empty="true" />,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-count hide-when-empty="true">
        <mock:shadow-root></mock:shadow-root>
      </cl-cart-count>
    `)
  })

  it('renders with updated quantity when "cl-cart-update" is triggered with order details', async () => {
    const { root, waitForChanges } = await render(<cl-cart-count />, {
      waitForReady: false,
    })

    await waitForChanges()

    document.dispatchEvent(
      new CustomEvent<CLCustomEventDetailMap["cl-cart-update"]>(
        "cl-cart-update",
        {
          detail: {
            request: {
              args: [],
            },
            response: {
              id: "ABC123",
              type: "orders",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "approved",
              fulfillment_status: "fulfilled",
              payment_status: "paid",
              line_items: [
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI1",
                  quantity: 6,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "skus",
                },
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI2",
                  quantity: 2,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "bundles",
                },
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI3",
                  quantity: 15,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "payment_methods",
                },
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI4",
                  quantity: 4,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "skus",
                },
              ],
            },
          },
        },
      ),
    )

    await waitFor(waitForChanges, () => root.getAttribute("quantity") === "12")

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-count quantity="12">
        <mock:shadow-root>
          12
        </mock:shadow-root>
      </cl-cart-count>
    `)
  })

  it('renders as empty when "cl-cart-update" is triggered with empty order', async () => {
    const { root, waitForChanges } = await render(<cl-cart-count />, {
      waitForReady: false,
    })

    await waitForChanges()

    document.dispatchEvent(
      new CustomEvent<CLCustomEventDetailMap["cl-cart-update"]>(
        "cl-cart-update",
        {
          detail: {
            request: {
              args: [],
            },
            response: {
              id: "ABC123",
              type: "orders",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "approved",
              fulfillment_status: "fulfilled",
              payment_status: "paid",
              line_items: [
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI1",
                  quantity: 6,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "skus",
                },
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI2",
                  quantity: 2,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "bundles",
                },
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI3",
                  quantity: 15,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "payment_methods",
                },
                {
                  type: "line_items",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  id: "LI4",
                  quantity: 4,
                  tax_amount_float: 12,
                  total_amount_float: 12,
                  item_type: "skus",
                },
              ],
            },
          },
        },
      ),
    )

    await waitFor(waitForChanges, () => root.getAttribute("quantity") === "12")

    document.dispatchEvent(
      new CustomEvent<CLCustomEventDetailMap["cl-cart-update"]>(
        "cl-cart-update",
        {
          detail: {
            request: {
              args: [],
            },
            response: {
              id: "ABC123",
              type: "orders",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "approved",
              fulfillment_status: "fulfilled",
              payment_status: "paid",
              line_items: [],
            },
          },
        },
      ),
    )

    await waitFor(
      waitForChanges,
      () => root.shadowRoot?.textContent?.trim() === "0",
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-count>
        <mock:shadow-root>
          0
        </mock:shadow-root>
      </cl-cart-count>
    `)
  })
})
