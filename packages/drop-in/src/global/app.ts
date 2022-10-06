import { createClient } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import { registerPrices } from '#apis/prices'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GuardedType<T> = T extends (x: any) => x is infer T ? T : never

const registrableNodes = {
  'cl-price': isClPrice
} as const

function isClPrice(element: any): element is HTMLClPriceElement {
  return (element as HTMLClPriceElement).nodeName.toLowerCase() === 'cl-price'
}

export const initialize = async function (): Promise<void> {
  const clClient = await createClient(getConfig())

  await registerPrices(clClient)

  type NodeList = {
    [key in keyof typeof registrableNodes]: Array<
      GuardedType<typeof registrableNodes[key]>
    >
  }

  const observer = new MutationObserver((mutationList) => {
    const nodes = mutationList.reduce<NodeList>(
      (nodes, mutation) => {
        if (mutation.type === 'childList') {
          ;(
            Object.keys(registrableNodes) as Array<
              keyof typeof registrableNodes
            >
          ).forEach((nodeName) => {
            nodes[nodeName].push(
              ...Array.from(mutation.addedNodes).filter(
                registrableNodes[nodeName]
              )
            )

            nodes[nodeName].push(
              ...Array.from(mutation.addedNodes).flatMap((node) =>
                Array.from((node as HTMLElement).querySelectorAll(nodeName))
              )
            )

            // nodes[nodeName] = nodes[nodeName]
            //   .concat(
            //     Array.from(mutation.addedNodes).filter(
            //       registrableNodes[nodeName]
            //     )
            //   )
            //   .concat(
            //     Array.from(mutation.addedNodes).flatMap((node) =>
            //       Array.from((node as HTMLElement).querySelectorAll(nodeName))
            //     )
            //   )
          })
        }

        return nodes
      },
      { 'cl-price': [] }
    )

    registerPrices(clClient, nodes['cl-price']).catch((error) => {
      throw error
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

export default initialize
