import type { E2EPage } from '@stencil/core/testing'

type Cookie = Awaited<ReturnType<E2EPage['cookies']>>[number]

export async function getCookie(
  page: E2EPage,
  cookieName: string
): Promise<Cookie | undefined> {
  return (await page.cookies()).find(
    (cookie) => cookie.name === encodeURIComponent(cookieName)
  )
}

export async function getCartId(page: E2EPage): Promise<string | null> {
  const cookieName = 'commercelayer_order-id'
  const cookie = await getCookie(page, cookieName)

  return cookie?.value ?? null
}

export async function getAccessToken(page: E2EPage): Promise<string | null> {
  const cookieName =
    'commercelayer_token-xOyPGgmYM3DPKyxpC6RoLkx0bgQAZ-FX2T2ogRf9vuU-market:10426'
  const cookie = await getCookie(page, cookieName)

  return cookie?.value ?? null
}

export async function expectForLineItems(
  page: E2EPage,
  options: { sku: string; quantity: number }
): Promise<void> {
  const response = await page.waitForResponse((response) => {
    return (
      response.url() ===
        'https://demo-store-1.commercelayer.io/api/line_items' &&
      response.request().method() === 'POST' &&
      response.status() === 201
    )
  })

  const cartId = await getCartId(page)

  const postData = response.request().postData()

  expect(postData).toBeDefined()

  expect(JSON.parse(postData ?? '')).toMatchObject({
    data: {
      attributes: {
        quantity: options.quantity,
        sku_code: options.sku
      },
      relationships: {
        order: {
          data: {
            id: cartId
          }
        }
      }
    }
  })
}
