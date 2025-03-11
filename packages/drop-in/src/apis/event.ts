import { memoDebounce } from "#utils/debounce"
import type { Expand } from "#utils/utility-types"
import type {
  AddItem,
  GetBundle,
  GetBundlePrice,
  GetSku,
  GetSkuPrice,
  GetToken,
  TriggerCartUpdate,
  TriggerHostedCartUpdate,
} from "./types"

export interface EventTypes {
  "cl-identity-gettoken": GetToken
  "cl-skus-getsku": GetSku
  "cl-skus-getprice": GetSkuPrice
  "cl-bundles-getbundle": GetBundle
  "cl-bundles-getprice": GetBundlePrice
  "cl-cart-additem": AddItem
  "cl-cart-hostedcartupdate": NonNullableReturnType<TriggerHostedCartUpdate>
  "cl-cart-update": NonNullableReturnType<TriggerCartUpdate>

  /** @deprecated Use `cl-skus-getprice` instead. This will be removed in a future version. */
  "cl-prices-getprice": GetSkuPrice
}

export type CLCustomEventDetailMap = {
  [key in keyof EventTypes]: Expand<CLCustomEventDetail<EventTypes[key]>>
}

type NonNullableReturnType<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => NonNullable<Awaited<ReturnType<T>>>

interface CLCustomEventDetail<Func extends (...args: any) => any> {
  request: {
    args: Parameters<Func>
  }
  response: Awaited<ReturnType<Func>>
}

/**
 * Dispatch a custom event `type`, providing an array of `args` and a `response`.
 *
 * > **To avoid the same event being fired too often**, it implements a basic debouncing practice:
 * multiple identical events (i.e. with the same `args` and `response`) triggered
 * less than **10ms** one from the other are fired only once (the first time).
 */
const _fireEvent = <
  Type extends keyof EventTypes,
  Func extends EventTypes[Type],
>(
  type: Type,
  args: Parameters<Func>,
  response: Awaited<ReturnType<Func>>,
): void => {
  document.dispatchEvent(
    new CustomEvent<CLCustomEventDetail<Func>>(type, {
      detail: {
        request: {
          args,
        },
        response,
      },
    }),
  )
}

export const fireEvent = memoDebounce(_fireEvent, 10, {
  leading: true,
  trailing: false,
}) as unknown as typeof _fireEvent

/**
 * Listen to a custom event `type`.
 */
export function listenTo<Type extends keyof CLCustomEventDetailMap>(
  type: Type,
  listener: (
    this: Document,
    evt: CustomEvent<CLCustomEventDetailMap[Type]>,
  ) => Promise<void> | void,
  options?: boolean | AddEventListenerOptions | undefined,
): void {
  document.addEventListener(
    type,
    function (this: Document, evt): void {
      void listener.apply(this, [
        evt as CustomEvent<CLCustomEventDetailMap[Type]>,
      ])
    },
    options,
  )
}
