import type { Token } from "@/apis/commercelayer/client"

export function getCookie(cookieName: string): string | undefined {
  const prefix = `${encodeURIComponent(cookieName)}=`
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix))

  return cookie?.slice(prefix.length)
}

export function getCartId(): string | null {
  const cookieName =
    "commercelayer_order-id-kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8-market:code:usa"

  return getCookie(cookieName) ?? null
}

export function getAccessToken(): Token | null {
  const cookieName =
    "commercelayer_token-kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8-market:code:usa"
  const cookie = getCookie(cookieName)

  return cookie !== undefined ? JSON.parse(decodeURIComponent(cookie)) : null
}
