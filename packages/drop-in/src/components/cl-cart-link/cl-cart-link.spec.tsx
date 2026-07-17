import type {
  orders as sdkOrders,
  organization as sdkOrganization,
} from "@commercelayer/sdk"
// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import Cookies from "js-cookie"
import { vi } from "vitest"
import * as cart from "@/apis/commercelayer/cart"
import * as client from "@/apis/commercelayer/client"
import { getConfig } from "@/apis/commercelayer/config"
import { getKeyForCart } from "@/apis/storage"
import { stripHydrationFlags, waitFor } from "@/testing/spec-helpers"
import "./cl-cart-link"

beforeEach(() => {
  // `getCart` is `memoize()`d in production code (see cart.ts); that cache
  // is a property of the real function itself, so it persists across tests
  // in this file regardless of vi.spyOn/restoreAllMocks. Clear it before
  // every test so an earlier test's cached result (e.g. a cart-less "null")
  // can't leak into a later one that expects `getCart()` to resolve fresh.
  cart.getCart.cache.clear?.()
})

afterEach(() => {
  vi.restoreAllMocks()
  // `js-cookie`'s remove() sets an expired cookie and relies on the browser's
  // cookie jar to drop it — but Stencil's mock-doc `document.cookie` is a
  // plain string property with no real expiry parsing (confirmed empirically:
  // Cookies.remove() is a no-op here), so reset it directly instead.
  // biome-ignore lint/suspicious/noDocumentCookie: mock-doc's fake document.cookie has no real cookie jar/Cookie Store API to use instead
  document.cookie = ""
})

describe("cl-cart-link.spec", () => {
  it("renders the cart url without a cartId during the first load", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken,
      scope: "market:code:usa",
    })

    vi.spyOn(client, "createClient").mockResolvedValue({
      orders,
      organization,
    } as unknown as Awaited<ReturnType<(typeof client)["createClient"]>>)

    const { root, waitForChanges } = await render(
      <cl-cart-link>Cart</cl-cart-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector("a")
      return (
        link?.getAttribute("href") ===
        `https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}`
      )
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-link target="_self">
        <a target="_self" href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}">
          Cart
        </a>
      </cl-cart-link>
    `)
  })

  it("renders the cart url with a defined cartUrl", async () => {
    // `getCart` can't be mocked directly here (see cart.ts: it's called from
    // *within* cart.ts itself by getCartUrl/isValidUrl/etc, so vi.spyOn on
    // the exported binding never intercepts those internal calls — a JS
    // module semantics fact, not a vitest bug). Instead, drive the *real*,
    // unmocked getCart() to the desired order: set a real cart-id cookie
    // (the guest-path lookup key) and mock the SDK call it makes.
    Cookies.set(getKeyForCart(getConfig()), "order-123")

    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken,
      scope: "market:code:usa",
    })
    vi.spyOn(client, "createClient").mockResolvedValue({
      orders: {
        ...orders,
        retrieve: vi.fn().mockResolvedValue({
          type: "orders",
          id: "order-123",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: "approved",
          fulfillment_status: "fulfilled",
          payment_status: "paid",
          editable: true,
          // matches getConfig()'s default `defaultAttributes.orders.language_code`,
          // so `updateOrderLanguage` returns this order as-is instead of calling
          // the (unmocked) `client.orders.update`.
          language_code: "en",
        }),
      },
      organization,
    } as unknown as Awaited<ReturnType<(typeof client)["createClient"]>>)

    const { root, waitForChanges } = await render(
      <cl-cart-link>Cart</cl-cart-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector("a")
      return (
        link?.getAttribute("href") ===
        `https://drop-in-js.commercelayer.app/cart/order-123?accessToken=${accessToken}`
      )
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-link target="_self">
        <a target="_self" href="https://drop-in-js.commercelayer.app/cart/order-123?accessToken=${accessToken}">
          Cart
        </a>
      </cl-cart-link>
    `)
  })

  it("renders the cart url with a cartId after clicking on the link when url is invalid", async () => {
    vi.spyOn(client, "getAccessToken").mockResolvedValue({
      ownerType: "guest",
      accessToken,
      scope: "market:code:usa",
    })
    vi.spyOn(cart, "getCart").mockResolvedValue(null)
    vi.spyOn(client, "createClient").mockResolvedValue({
      orders,
      organization,
    } as unknown as Awaited<ReturnType<(typeof client)["createClient"]>>)

    const { root, waitForChanges } = await render(
      <cl-cart-link>Cart</cl-cart-link>,
      { waitForReady: false },
    )

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector("a")
      return (
        link?.getAttribute("href") ===
        `https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}`
      )
    })

    root?.querySelector("a")?.click()

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector("a")
      return (
        link?.getAttribute("href") ===
        `https://drop-in-js.commercelayer.app/cart/order-123?accessToken=${accessToken}`
      )
    })

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-cart-link target="_self">
        <a target="_self" href="https://drop-in-js.commercelayer.app/cart/order-123?accessToken=${accessToken}">
          Cart
        </a>
      </cl-cart-link>
    `)
  })
})

// sample access token
const accessToken =
  "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJPblZOcUZPTUpuIiwic2x1ZyI6ImRyb3AtaW4tanMiLCJlbnRlcnByaXNlIjp0cnVlLCJyZWdpb24iOiJldS13ZXN0LTEifSwiYXBwbGljYXRpb24iOnsiaWQiOiJkTm5XbWl4eEtHIiwiY2xpZW50X2lkIjoia3VTS1BiZUtiVTlMRzlMam5kemllS1dSY2ZpWEZ1RWZPME9ZSFhLSDlKOCIsImtpbmQiOiJzYWxlc19jaGFubmVsIiwicHVibGljIjp0cnVlfSwibWFya2V0Ijp7ImlkIjpbIkJvd2RHaHdYZGoiXSwic3RvY2tfbG9jYXRpb25faWRzIjpbIkRuZ2VwdU5tT2siLCJLR3lPanV5S1hNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmNvZGU6dXNhIiwiZXhwIjoxNzMwOTEzNjkxLCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjQ2MjA0OTI5MDY1NTczNTIsImlhdCI6MTczMDkwNjQ5MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.OJerreNcfS_QKQ691iKyJqgAemIouRTBHfqmy2mlAt4_GnqtqjEFRW_hE9SNW8h80eUnSDMc4ocOSsHL5nqKZQeXkwlycwtYzNMralEM03jgLDIMvRzfFznZNOXNrySSFPQ9zrIHlbyfW3Wxc8hMEz-SvZ7t0cSlrvSqSEoLBAoMQqsBJkiIVYMWlUmgq_d0dznU4U8MJiPvC-rb32lRinLl3M0TGGApnDTijuQALywGbPkNZzMs3rrK8pz1Gf7ZYVgu9aXUCDEVEac99kTLJj2DJdHMNHYjzupoKu8xSutSAShN8MHaM_9ijuJHmlCdgAfQtEKoGOKpGp7JH8Zl7zeYDkmsdVAqvGAIGNBzHnxb7SdPXmPViq_9u5K9Bq1IBr9K1TwcCyjMTFghnJm6CfDQ60AEPB4dxWHSXNTyGCAcrSwDqni7dgcD3G1Asqb5TmlxOtcmC0jXrZE4TQQZqBUFBiWTXiMhFhq8tGE6PlW0fIZzV9xlKPkaLPKO6rGdmiutmofAB8CVz1ZkmyIaHNR4KbIfWZUVQDEOkCPHzy_yXB7LinYlpDtVlJxZ9n_aetuxmJweLT94LQml56kcmXRPJbNH208ermGKpipQkqM6GoknqtEG3ouVgahjVwD2bSqFGPtZyrYgIzhunupkIhEz1dSLDrk0wXJS9GY4W50"

const orders: Partial<typeof sdkOrders> = {
  create: vi.fn().mockResolvedValue({
    type: "orders",
    id: "order-123",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }),
}

const organization: Partial<typeof sdkOrganization> = {
  retrieve: vi.fn().mockResolvedValue({
    type: "organizations",
    id: "organization-123",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }),
}
