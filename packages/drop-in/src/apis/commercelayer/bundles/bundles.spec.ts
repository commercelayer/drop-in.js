import type { Bundle, Inventory } from "#apis/types"
import { getBundleInventory } from "./bundles"

function mockSkuListItem(
  skuListItem: MockSkuListItem,
): Bundle["sku_list"]["sku_list_items"][number] {
  const time = new Date().toJSON()

  return {
    type: "sku_list_items",
    created_at: time,
    updated_at: time,
    id: `123`,
    quantity: skuListItem.quantity,
    sku: {
      code: "123",
      created_at: time,
      updated_at: time,
      id: `123`,
      name: "123",
      type: "skus",
      inventory: skuListItem.sku.inventory,
    },
  }
}

type MockSkuListItem = Pick<
  Bundle["sku_list"]["sku_list_items"][number],
  "quantity"
> & {
  sku: {
    inventory: Inventory
  }
}

function mockBundle(id: string, skuListItems: MockSkuListItem[]): Bundle {
  const time = new Date().toJSON()

  return {
    type: "bundles",
    created_at: time,
    updated_at: time,
    id: `bundle-${id}`,
    code: "BUNDLE123",
    name: "Bundle 123",
    sku_list: {
      type: "sku_lists",
      created_at: time,
      updated_at: time,
      id: `sku_list-${id}`,
      slug: `sku-list-${id}`,
      name: `Sku List (${id})`,
      sku_list_items: skuListItems.map(mockSkuListItem),
    },
  }
}

describe("getBundleInventory", () => {
  describe("basic rules with one item", () => {
    it("should return the quantity=1 with the simples scenario", () => {
      const bundle = mockBundle("1", [
        {
          quantity: 1,
          sku: {
            inventory: {
              available: true,
              levels: [],
              quantity: 1,
            },
          },
        },
      ])

      expect(getBundleInventory(bundle)).toEqual({
        available: true,
        levels: [],
        quantity: 1,
      })
    })

    it("should return the quantity=undefined when the sku quantity is undefined (do-not-track)", () => {
      const bundle = mockBundle("1", [
        {
          quantity: 1,
          sku: {
            inventory: {
              available: true,
              levels: [],
            },
          },
        },
      ])

      expect(getBundleInventory(bundle)).toEqual({
        available: true,
        levels: [],
      })
    })

    it("should return the quantity=0 when the sku quantity is lower than the request sku_list_item quantity", () => {
      const bundle = mockBundle("1", [
        {
          quantity: 2,
          sku: {
            inventory: {
              available: true,
              levels: [],
              quantity: 1,
            },
          },
        },
      ])

      expect(getBundleInventory(bundle)).toEqual({
        available: true,
        levels: [],
        quantity: 0,
      })
    })

    it("should return the available=false when the sku available is false", () => {
      const bundle = mockBundle("1", [
        {
          quantity: 1,
          sku: {
            inventory: {
              available: false,
              levels: [],
              quantity: 1,
            },
          },
        },
      ])

      expect(getBundleInventory(bundle)).toEqual({
        available: false,
        levels: [],
        quantity: 1,
      })
    })
  })

  describe("more complex rules with more than one item", () => {
    it("should return the lesser available quantity (14/5 = 2) (3/1 = 3) (2 < 3) =>  2", () => {
      const bundle = mockBundle("1", [
        {
          quantity: 5,
          sku: {
            inventory: {
              available: true,
              levels: [],
              quantity: 14,
            },
          },
        },
        {
          quantity: 1,
          sku: {
            inventory: {
              available: true,
              levels: [],
              quantity: 3,
            },
          },
        },
      ])

      expect(getBundleInventory(bundle)).toEqual({
        available: true,
        levels: [],
        quantity: 2,
      })
    })

    it("should return the lesser available quantity considering do-not-track items (do-not-track/5 = ∞) (3/1 = 3) (3 < Infinity) =>  3", () => {
      const bundle = mockBundle("1", [
        {
          quantity: 5,
          sku: {
            inventory: {
              available: true,
              levels: [],
            },
          },
        },
        {
          quantity: 1,
          sku: {
            inventory: {
              available: true,
              levels: [],
              quantity: 3,
            },
          },
        },
      ])

      expect(getBundleInventory(bundle)).toEqual({
        available: true,
        levels: [],
        quantity: 3,
      })
    })
  })
})
