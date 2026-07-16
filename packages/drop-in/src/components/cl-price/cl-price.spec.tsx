import type { Price } from "@commercelayer/sdk"
// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import { vi } from "vitest"
import * as client from "@/apis/commercelayer/client"
import * as skus from "@/apis/commercelayer/skus"
import {
  mockedAccessToken,
  stripHydrationFlags,
  waitForMs,
} from "@/testing/spec-helpers"
import "@/components/cl-price-amount/cl-price-amount"
import "./cl-price"

const fakePrices: { [sku: string]: Price } = {
  ABC123: {
    id: "ABC123",
    type: "prices",
    amount_cents: 1200,
    amount_float: 12,
    compare_at_amount_cents: 2850,
    compare_at_amount_float: 28.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    formatted_amount: "€ 12.00",
    formatted_compare_at_amount: "€ 28.50",
  },
  DEF456: {
    id: "DEF456",
    type: "prices",
    amount_cents: 3100,
    amount_float: 31,
    compare_at_amount_cents: 4300,
    compare_at_amount_float: 43,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    formatted_amount: "€ 31.00",
    formatted_compare_at_amount: "€ 43.00",
  },
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe("cl-price.spec", () => {
  it("renders without attributes", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    const { root, waitForChanges } = await render(
      <cl-price code={undefined} />,
      {
        waitForReady: false,
      },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-price kind="sku">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-price>
    `)
  })

  it("renders with a code", async () => {
    vi.spyOn(skus, "getPrice").mockImplementation(
      async (sku: string) => await Promise.resolve(fakePrices[sku]),
    )

    const { root, waitForChanges } = await render(<cl-price code="SKU1234" />, {
      waitForReady: false,
    })

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-price kind="sku" code="SKU1234">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-price>
    `)
  })

  it('should pass-throw the "priceUpdate" event to children', async () => {
    vi.spyOn(skus, "getPrice").mockImplementation(
      async (sku: string) => await Promise.resolve(fakePrices[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-price code="ABC123">
        <cl-price-amount></cl-price-amount>
        <another-tag></another-tag>
      </cl-price>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-price kind="sku" code="ABC123">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-price-amount type="price">
          <mock:shadow-root>
            € 12.00
          </mock:shadow-root>
        </cl-price-amount>
        <another-tag></another-tag>
      </cl-price>
    `)
  })

  it('should fetch the new price when "code" changes', async () => {
    vi.spyOn(skus, "getPrice").mockImplementation(
      async (sku: string) => await Promise.resolve(fakePrices[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-price code="ABC123">
        <cl-price-amount></cl-price-amount>
        <another-tag></another-tag>
      </cl-price>,
      { waitForReady: false },
    )

    await waitForChanges()

    root.setAttribute("code", "DEF456")

    await waitForMs(11)

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-price kind="sku" code="DEF456">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-price-amount type="price">
          <mock:shadow-root>
            € 31.00
          </mock:shadow-root>
        </cl-price-amount>
        <another-tag></another-tag>
      </cl-price>
    `)
  })

  it("should empty the price when the there are no results", async () => {
    vi.spyOn(skus, "getPrice").mockImplementation(
      async (sku: string) => await Promise.resolve(fakePrices[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-price code="ABC123">
        <cl-price-amount></cl-price-amount>
        <another-tag></another-tag>
      </cl-price>,
      { waitForReady: false },
    )

    await waitForChanges()

    root.setAttribute("code", "ABC456")

    await waitForMs(11)

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-price kind="sku" code="ABC456">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-price-amount type="price">
          <mock:shadow-root></mock:shadow-root>
        </cl-price-amount>
        <another-tag></another-tag>
      </cl-price>
    `)
  })
})
