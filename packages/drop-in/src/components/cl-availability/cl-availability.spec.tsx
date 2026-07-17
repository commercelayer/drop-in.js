// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import { vi } from "vitest"
import * as cart from "@/apis/commercelayer/cart"
import * as skus from "@/apis/commercelayer/skus"
import type { Sku } from "@/apis/types"
import { stripHydrationFlags, waitFor, waitForMs } from "@/testing/spec-helpers"
import "@/components/cl-availability-info/cl-availability-info"
import "@/components/cl-availability-status/cl-availability-status"
import "./cl-availability"

afterEach(() => {
  vi.restoreAllMocks()
})

const baseSku = (id: string): Sku => {
  return {
    id,
    code: id,
    name: id,
    type: "skus",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as const
}

const skuList: { [code: string]: Sku } = {
  AVAILABLE123: {
    ...baseSku("AVAILABLE123"),
    inventory: {
      levels: [
        {
          delivery_lead_times: [
            {
              min: {
                days: 1,
                hours: 1 * 24,
              },
              max: {
                days: 2,
                hours: 2 * 24,
              },
              shipping_method: {
                name: "Standard",
                reference: "reference-1",
                price_amount_cents: 700,
                formatted_price_amount: "$7.00",
                formatted_free_over_amount: null,
                free_over_amount_cents: null,
              },
            },
          ],
          quantity: 98,
        },
      ],
      available: true,
      quantity: 98,
    },
  },
  NOTAVAILABLE456: {
    ...baseSku("NOTAVAILABLE456"),
    inventory: {
      levels: [],
      available: false,
      quantity: 0,
    },
  },
}

describe("cl-availability.spec", () => {
  it("renders without attributes", async () => {
    const { root, waitForChanges } = await render(
      <cl-availability code={undefined} />,
      {
        waitForReady: false,
      },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-availability kind="sku" rule="cheapest">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-availability>
    `)
  })

  it("renders with a code", async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-availability code="AVAILABLE123" />,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-availability kind="sku" code="AVAILABLE123" rule="cheapest">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cl-availability>
    `)
  })

  it('should pass-throw the "availabilityUpdate" event to children', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-availability code="AVAILABLE123">
        <cl-availability-status type={undefined}></cl-availability-status>
        <cl-availability-status type="available">
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          • out of stock
        </cl-availability-status>
        <cl-availability-status type="available-with-info">
          <cl-availability-info type="min-days"></cl-availability-info>
          <cl-availability-info type="max-days"></cl-availability-info>
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-availability kind="sku" code="AVAILABLE123" rule="cheapest">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-availability-status aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-status>
        <cl-availability-status type="available">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status aria-disabled="true" type="unavailable">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
        <cl-availability-status type="available-with-info">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          <cl-availability-info type="min-days">
            <mock:shadow-root>
              1
            </mock:shadow-root>
          </cl-availability-info>
          <cl-availability-info type="max-days">
            <mock:shadow-root>
              2
            </mock:shadow-root>
          </cl-availability-info>
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>
    `)
  })

  it('should pass-throw "unavailable" when product is out-of-stock', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    vi.spyOn(cart, "getCart").mockImplementation(
      async () =>
        await Promise.resolve({
          line_items: [
            {
              id: "line-item-id",
              type: "line_items",
              quantity: 98,
              sku_code: "AVAILABLE123",
            },
          ],
        } as any),
    )

    const { root, waitForChanges } = await render(
      <cl-availability code="AVAILABLE123">
        <cl-availability-status type={undefined}></cl-availability-status>
        <cl-availability-status type="available">
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          • out of stock
        </cl-availability-status>
        <cl-availability-status type="available-with-info">
          <cl-availability-info type="min-days"></cl-availability-info>
          <cl-availability-info type="max-days"></cl-availability-info>
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-availability kind="sku" code="AVAILABLE123" rule="cheapest">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-availability-status aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-status>
        <cl-availability-status aria-disabled="true" type="available">
          <mock:shadow-root></mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • out of stock
        </cl-availability-status>
        <cl-availability-status aria-disabled="true" type="available-with-info">
          <mock:shadow-root></mock:shadow-root>
          <cl-availability-info type="min-days">
            <mock:shadow-root>
              1
            </mock:shadow-root>
          </cl-availability-info>
          <cl-availability-info type="max-days">
            <mock:shadow-root>
              2
            </mock:shadow-root>
          </cl-availability-info>
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>
    `)
  })

  it('should fetch the new availability when "code" changes', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-availability code="AVAILABLE123">
        <cl-availability-status type={undefined}></cl-availability-status>
        <cl-availability-status type="available">
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          • out of stock
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    root.setAttribute("code", "NOTAVAILABLE456")

    await waitForMs(11)

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-availability kind="sku" code="NOTAVAILABLE456" rule="cheapest">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-availability-status aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-status>
        <cl-availability-status type="available" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          <mock:shadow-root>
            <slot></slot>
          </mock:shadow-root>
          • out of stock
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>
    `)
  })

  it("should empty the text when the there are no results", async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-availability code="AVAILABLE123">
        <cl-availability-status type={undefined}></cl-availability-status>
        <cl-availability-status type="available">
          • available
        </cl-availability-status>
        <cl-availability-status type="unavailable">
          • out of stock
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    root.setAttribute("code", "NONEXISTING")

    await waitForMs(11)

    await waitFor(waitForChanges, () => root.hasAttribute("rule"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-availability kind="sku" code="NONEXISTING" rule="cheapest">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <cl-availability-status aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
        </cl-availability-status>
        <cl-availability-status type="available" aria-disabled="true">
          <mock:shadow-root></mock:shadow-root>
          • available
        </cl-availability-status>
        <cl-availability-status aria-disabled="true" type="unavailable">
          <mock:shadow-root></mock:shadow-root>
          • out of stock
        </cl-availability-status>
        <another-tag></another-tag>
      </cl-availability>
    `)
  })
})
