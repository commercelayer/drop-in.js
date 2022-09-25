import { getClient } from '../apis/auth'
import { registerPrices } from '../apis/prices'

export default async function () {
  if (!window.commercelayerConfig) {
    // TODO: define a proper error message
    throw new Error('"commercelayerConfig" is required. Link to doc here.')
  }

  const clClient = await getClient(window.commercelayerConfig)

  registerPrices(clClient)
}
