import { memoDebounce } from '#utils/debounce'
import type { Expand } from '#utils/utility-types'
import type {
  AddItem,
  GetPrice,
  GetSku,
  TriggerCartUpdate,
  TriggerHostedCartUpdate
} from './types'

export interface EventTypes {
  'cl-prices-getprice': GetPrice
  'cl-skus-getsku': GetSku
  'cl-cart-additem': AddItem
  'cl-cart-hostedcartupdate': NonNullableReturnType<TriggerHostedCartUpdate>
  'cl-cart-update': NonNullableReturnType<TriggerCartUpdate>
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

export const dispatchEvent = memoDebounce(
  <Type extends keyof EventTypes, Func extends EventTypes[Type]>(
    type: Type,
    args: Parameters<Func>,
    response: Awaited<ReturnType<Func>>
  ): void => {
    document.dispatchEvent(
      new CustomEvent<CLCustomEventDetail<Func>>(type, {
        detail: {
          request: {
            args
          },
          response
        }
      })
    )
  },
  10,
  { maxWait: 50 }
)

export function listenTo<Type extends keyof CLCustomEventDetailMap>(
  type: Type,
  listener: (
    this: Document,
    evt: CustomEvent<CLCustomEventDetailMap[Type]>
  ) => Promise<void> | void,
  options?: boolean | AddEventListenerOptions | undefined
): void {
  document.addEventListener(
    type,
    function (this: Document, evt): void {
      void listener.apply(this, [
        evt as CustomEvent<CLCustomEventDetailMap[Type]>
      ])
    },
    options
  )
}
