import { createClient, getConfig } from '#apis/commercelayer'
import { registerPrices } from '#apis/prices'

export default async function () {
  const clClient = await createClient(getConfig())

  registerPrices(clClient)
}
