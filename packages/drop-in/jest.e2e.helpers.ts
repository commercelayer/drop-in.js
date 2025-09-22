import type { E2EPage } from "@stencil/core/testing"
import type { Token } from "@/apis/commercelayer/client"
import type { CommerceLayerConfig } from "@/apis/commercelayer/config"

type Cookie = Awaited<ReturnType<E2EPage["cookies"]>>[number]

export function getCommerceLayerConfiguration({
  clientId = "kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8",
  scope = "market:code:usa",
}: Partial<CommerceLayerConfig> = {}): string {
  return `
    <script>
      commercelayerConfig = {
        clientId: '${clientId}',
        scope: '${scope}'
      }
    </script>
  `
}

export async function getCookie(
  page: E2EPage,
  cookieName: string,
): Promise<Cookie | undefined> {
  return (await page.cookies()).find(
    (cookie) => cookie.name === encodeURIComponent(cookieName),
  )
}

export async function getCartId(page: E2EPage): Promise<string | null> {
  const cookieName =
    "commercelayer_order-id-kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8-market:code:usa"
  const cookie = await getCookie(page, cookieName)

  return cookie?.value ?? null
}

export async function getAccessToken(page: E2EPage): Promise<Token | null> {
  const cookieName =
    "commercelayer_token-kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8-market:code:usa"
  const cookie = await getCookie(page, cookieName)

  return cookie?.value !== undefined
    ? JSON.parse(decodeURIComponent(cookie?.value))
    : null
}

export async function waitAndExpectForLineItems(
  page: E2EPage,
  options: { code: string; quantity: number },
): Promise<void> {
  const response = await page.waitForResponse((response) => {
    return (
      response.url() === "https://drop-in-js.commercelayer.io/api/line_items" &&
      response.request().method() === "POST" &&
      response.status() === 201
    )
  })

  const cartId = await getCartId(page)

  const postData = response.request().postData()

  expect(postData).toBeDefined()

  expect(JSON.parse(postData ?? "")).toMatchObject({
    data: {
      attributes: {
        quantity: options.quantity,
        sku_code: options.code,
      },
      relationships: {
        order: {
          data: {
            id: cartId,
          },
        },
      },
    },
  })
}
