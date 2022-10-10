import { createClient } from '#apis/commercelayer/client';
import { getConfig } from '#apis/commercelayer/config';
import { registerPrices } from '#apis/prices';
const registrableNodes = {
  'cl-price': isClPrice
};
function isClPrice(element) {
  return element.nodeName.toLowerCase() === 'cl-price';
}
export const initialize = async function () {
  const clClient = await createClient(getConfig());
  await registerPrices(clClient);
  const observer = new MutationObserver((mutationList) => {
    const nodes = mutationList.reduce((nodes, mutation) => {
      if (mutation.type === 'childList') {
        ;
        Object.keys(registrableNodes).forEach((nodeName) => {
          nodes[nodeName].push(...Array.from(mutation.addedNodes).filter(registrableNodes[nodeName]));
          nodes[nodeName].push(...Array.from(mutation.addedNodes).flatMap((node) => Array.from(node.querySelectorAll(nodeName))));
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
        });
      }
      return nodes;
    }, { 'cl-price': [] });
    registerPrices(clClient, nodes['cl-price']).catch((error) => {
      throw error;
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};
export default initialize;
