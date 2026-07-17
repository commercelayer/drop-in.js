// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import { vi } from "vitest"
import * as cart from "@/apis/commercelayer/cart"
import * as skus from "@/apis/commercelayer/skus"
import type { Sku } from "@/apis/types"
import { stripHydrationFlags, waitFor, waitForMs } from "@/testing/spec-helpers"
import "./cl-add-to-cart"

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
  }
}

const skuList: { [code: string]: Sku } = {
  AVAILABLE123: {
    ...baseSku("AVAILABLE123"),
    inventory: {
      levels: [],
      available: true,
      quantity: 98,
    },
  },
  DONOTTRACK456: {
    ...baseSku("DONOTTRACK456"),
    do_not_track: true,
    inventory: {
      levels: [],
      available: true,
    },
  },
  UNAVAILABLE789: {
    ...baseSku("UNAVAILABLE789"),
    inventory: {
      levels: [],
      available: false,
      quantity: 0,
    },
  },
}

describe("cl-add-to-cart.spec", () => {
  it("renders as disabled when created without attributes", async () => {
    const { root, waitForChanges } = await render(
      <cl-add-to-cart code={undefined}>Add to cart</cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" aria-disabled="true" kind="sku" quantity="1">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it("renders with the default quantity set to 1", async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123">Add to cart</cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" kind="sku" code="AVAILABLE123" quantity="1">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it("renders as disabled when providing an invalid quantity", async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" quantity={-3}>
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" aria-disabled="true" kind="sku" code="AVAILABLE123" quantity="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it("renders with a provided quantity", async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" quantity={8}>
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" kind="sku" code="AVAILABLE123" quantity="8">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "code" attribute changes', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" quantity={8}>
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    root.setAttribute("code", "UNAVAILABLE789")
    root.setAttribute("quantity", "4")

    await waitForMs(11)

    await waitFor(
      waitForChanges,
      () => root.getAttribute("code") === "UNAVAILABLE789",
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" kind="sku" code="UNAVAILABLE789" quantity="4" aria-disabled="true">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "quantity" attribute changes', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" quantity={8}>
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    root.setAttribute("quantity", "-3")

    await waitForMs(11)

    await waitFor(waitForChanges, () => root.getAttribute("quantity") === "0")

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" kind="sku" code="AVAILABLE123" quantity="0" aria-disabled="true">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "frequency" attribute is set', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" frequency="three-month">
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    root.setAttribute("frequency", "six-month")

    await waitForMs(11)

    await waitFor(
      waitForChanges,
      () => root.getAttribute("frequency") === "six-month",
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" kind="sku" code="AVAILABLE123" quantity="1" frequency="six-month">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "name" attribute is set', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" name="Custom name">
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    root.setAttribute("name", "Nome personalizzato")

    await waitForMs(11)

    await waitFor(
      waitForChanges,
      () => root.getAttribute("name") === "Nome personalizzato",
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" kind="sku" code="AVAILABLE123" quantity="1" name="Nome personalizzato">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "image-url" attribute is set', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart
        code="AVAILABLE123"
        image-url="https://example.com/image-1"
      >
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    root.setAttribute("image-url", "https://example.com/image-2")

    await waitForMs(11)

    await waitFor(
      waitForChanges,
      () => root.getAttribute("image-url") === "https://example.com/image-2",
    )

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart image-url="https://example.com/image-2" role="button" tabindex="0" kind="sku" code="AVAILABLE123" quantity="1">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it("renders disabled when item is out of stock", async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="UNAVAILABLE789">Add to cart</cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" aria-disabled="true" kind="sku" code="UNAVAILABLE789" quantity="1">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it("renders disabled when item has less than available quantity", async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" quantity={99}>
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" aria-disabled="true" kind="sku" code="AVAILABLE123" quantity="99">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it("renders disabled when item has less than available quantity (considering items in the cart)", async () => {
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
              quantity: 9,
              sku_code: "AVAILABLE123",
            },
          ],
        } as any),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="AVAILABLE123" quantity={90}>
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" aria-disabled="true" kind="sku" code="AVAILABLE123" quantity="90">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders enabled when item has "do_not_track" attribute set to true', async () => {
    vi.spyOn(skus, "getSku").mockImplementation(
      async (sku: string) => await Promise.resolve(skuList[sku]),
    )

    const { root, waitForChanges } = await render(
      <cl-add-to-cart code="DONOTTRACK456" quantity={99}>
        Add to cart
      </cl-add-to-cart>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => root.hasAttribute("role"))

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-add-to-cart role="button" tabindex="0" kind="sku" code="DONOTTRACK456" quantity="99">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })
})
