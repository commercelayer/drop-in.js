import { CommerceLayerClient, Price } from '@commercelayer/sdk'

const componentName = 'cl-price'

export const registerPrices = async (client: CommerceLayerClient): Promise<void> => {
  customElements.whenDefined(componentName).then(async () => {

    const elements = document.querySelectorAll(componentName)
    const skus = Array.from(elements).map(element => element.getAttribute('sku'))

    // TODO: `chunk` skus with pagination
    const pricesResponse = await client.prices.list({
      filters: { sku_code_in: skus.join(',') }
    })

    // TODO: this should be used as cache for future calls or to avoid fetching multiple time same items
    const prices: { [sku: string]: Price } = pricesResponse.reduce((prices, price) => {
      if (price.sku_code) {
        prices[price.sku_code] = price
      }

      return prices
    }, {} as { [sku: string]: Price })

    elements.forEach(element => {
      const sku = element.getAttribute('sku')
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
