import { createClient, getConfig } from '#apis/commercelayer'
import { registerPrices } from '#apis/prices'

type GuardedType<T> = T extends (x: any) => x is (infer T) ? T : never

const registrableNodes = {
  'cl-price': isClPrice,
} as const

function isClPrice(element: any): element is HTMLClPriceElement {
  return (element as HTMLClPriceElement).nodeName.toLowerCase() === 'cl-price'
}

export default async function () {
  const clClient = await createClient(getConfig())

  registerPrices(clClient)

  const observer = new MutationObserver(
    mutationList => {
      const nodes = mutationList.reduce((nodes, mutation) => {
        if (mutation.type === 'childList') {
          (Object.keys(registrableNodes) as Array<keyof typeof registrableNodes>).forEach(nodeName => {
            nodes[nodeName] ||= []
            nodes[nodeName] = nodes[nodeName].concat(
              Array.from(mutation.addedNodes).filter(registrableNodes[nodeName])
            )
          })
        }

        return nodes
      }, {} as { [key in (keyof typeof registrableNodes)]: GuardedType<((typeof registrableNodes)[key])>[] })

      registerPrices(clClient, nodes['cl-price'])
    }
  )

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}
