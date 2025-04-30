import type { CommerceLayerConfig } from "@commercelayer/drop-in.js"

export const codes = {
  nonexisting: "NONEXISTINGSKU",
  available: "5PANECAP000000FFFFFFXXXX",
  noOverselling: "GMUG11OZFFFFFF000000XXXX",
  noDiscount: "BACKPACKFFFFFF000000XXXX",
  outOfStock: "5PANECAP9D9CA1FFFFFFXXXX",
  doNotTrack: "BOTT17OZFFFFFF000000XXXX",
  digitalProduct: "EBOOKECOMPLAYBOOKED1XXXX",
  subscription: "POLOMXXX000000FFFFFFMXXX",
  bundleAvailable: "CLGETTINGSTARTED",
  bundleOutOfStock: "CLOUTOFSTOCK",
}

// // stg
// export const createConfig = (scope: string): CommerceLayerConfig => ({
//   clientId: "gQMSINLyMm2TrZo0UGEEdubC7uSgm9-",
//   scope,
//   debug: "all",
//   domain: "commercelayer.co"
// })

// prd
export const createConfig = (scope: string): CommerceLayerConfig => ({
  clientId: "kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8",
  scope,
  debug: "all",
})
