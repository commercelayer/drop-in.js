import type { skus as sdkSkus } from "@commercelayer/sdk/single-client"
import { vi } from "vitest"
import * as client from "@/apis/commercelayer/client"
import type { Inventory, Sku } from "@/apis/types"
import { skuFields } from "./list"
import { getSku } from "./skus"

afterEach(() => {
  vi.restoreAllMocks()
})

const inventory: Inventory = {
  available: true,
  quantity: 4,
  levels: [{ quantity: 4, delivery_lead_times: [] }],
}

function mockSku(code: string): Sku {
  const time = new Date().toJSON()

  return {
    type: "skus",
    id: `id-${code}`,
    code,
    name: `SKU ${code}`,
    created_at: time,
    updated_at: time,
    inventory,
  }
}

/** Mocks the SKU list API, answering with a SKU for every requested code in `existingCodes`. */
function mockSkusApi(existingCodes: string[]) {
  const list = vi.fn<(typeof sdkSkus)["list"]>(async (params) => {
    const { code_in } = params?.filters ?? {}
    const requestedCodes = String(code_in).split(",")
    return requestedCodes
      .filter((code) => existingCodes.includes(code))
      .map(mockSku) as unknown as Awaited<ReturnType<(typeof sdkSkus)["list"]>>
  })

  const retrieve = vi.fn<(typeof sdkSkus)["retrieve"]>()

  vi.spyOn(client, "createClient").mockResolvedValue({
    skus: { list, retrieve },
  } as unknown as Awaited<ReturnType<(typeof client)["createClient"]>>)

  return { list, retrieve }
}

describe("getSku", () => {
  it("fetches SKUs requested together with one list request that includes the inventory", async () => {
    const { list, retrieve } = mockSkusApi(["SKU-A1", "SKU-A2"])

    const [skuA1, skuA2] = await Promise.all([
      getSku("SKU-A1"),
      getSku("SKU-A2"),
    ])

    expect(list).toHaveBeenCalledTimes(1)
    expect(list).toHaveBeenCalledWith({
      pageSize: 25,
      filters: { code_in: "SKU-A1,SKU-A2" },
      fields: { skus: skuFields },
    })
    expect(skuFields).toContain("inventory")
    expect(retrieve).not.toHaveBeenCalled()

    expect(skuA1).toMatchObject({ code: "SKU-A1", inventory })
    expect(skuA2).toMatchObject({ code: "SKU-A2", inventory })
  })

  it("resolves to `undefined` for a code that does not exist", async () => {
    mockSkusApi(["SKU-B1"])

    const [skuB1, missingSku] = await Promise.all([
      getSku("SKU-B1"),
      getSku("SKU-B-MISSING"),
    ])

    expect(skuB1).toMatchObject({ code: "SKU-B1" })
    expect(missingSku).toBeUndefined()
  })

  it("splits more than 25 codes into chunks of 25", async () => {
    const codes = Array.from({ length: 30 }, (_, index) => `SKU-C${index}`)
    const { list } = mockSkusApi(codes)

    const fetchedSkus = await Promise.all(codes.map((code) => getSku(code)))

    expect(list).toHaveBeenCalledTimes(2)
    expect(fetchedSkus.map((sku) => sku?.code)).toEqual(codes)
  })

  it("fires `cl-skus-getsku` with the fetched SKU", async () => {
    mockSkusApi(["SKU-D1"])
    const listener = vi.fn()
    document.addEventListener("cl-skus-getsku", listener)

    const sku = await getSku("SKU-D1")

    document.removeEventListener("cl-skus-getsku", listener)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener.mock.calls[0]?.[0].detail).toEqual({
      request: { args: ["SKU-D1"] },
      response: sku,
    })
  })
})
