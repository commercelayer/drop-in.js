import { CommerceLayerClient, Price } from '@commercelayer/sdk'
import { chunk, isNotNullish, uniq } from '../utils/utils'

const componentName = 'cl-price'

function getSku(element: HTMLClPriceElement): string | null {
  return element.getAttribute('sku')
}

export const registerPrices = async (client: CommerceLayerClient): Promise<void> => {
  customElements.whenDefined(componentName).then(async () => {

    const elements = Array.from(document.querySelectorAll(componentName))
    const skus = uniq(elements.map(getSku).filter(isNotNullish))

    const pageSize = 25
    const chunkedSkus = chunk(skus, pageSize)

    const pricesResponse = (await Promise.all(
      chunkedSkus.map(async (skus) => {
        return await client.prices.list({
          pageSize,
          filters: { sku_code_in: skus.join(',') }
        })
      })
    )).flat()

    // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
    const prices: { [sku: string]: Price } = pricesResponse.reduce((prices, price) => {
      if (price.sku_code) {
        prices[price.sku_code] = price
      }

      return prices
    }, {} as { [sku: string]: Price })

    elements.forEach(element => {
      const sku = getSku(element)
      if (sku) {
        const price = prices[sku]
        if (price) {
          element.dispatchEvent(new CustomEvent(`priceUpdate`, { detail: price }))
        }
      }
    })

    // TODO: MutationObserver
  })
}
