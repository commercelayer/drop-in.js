import type { Order } from "@commercelayer/sdk"
import {
  Component,
  Element,
  // biome-ignore lint/correctness/noUnusedImports: "h" is used in the render method
  h,
  type JSX,
  Prop,
  State,
  Watch,
} from "@stencil/core"
import { debounce } from "lodash-es"
import { getCart, getCartQuantity } from "@/apis/commercelayer/cart"
import { getSku } from "@/apis/commercelayer/skus"
import { listenTo } from "@/apis/event"
import type { AvailabilityUpdateEventPayload, Sku } from "@/apis/types"
import {
  isValidCode,
  logCode,
  logUnion,
  unionToTuple,
} from "@/utils/validation-helpers"

@Component({
  tag: "cl-availability",
  shadow: true,
})
export class ClAvailability {
  @Element() host!: HTMLClAvailabilityElement

  private readonly kindList = unionToTuple<typeof this.kind>()("sku", "bundle")

  private readonly kindDefault: NonNullable<typeof this.kind> = "sku"

  /**
   * Indicates whether the code refers to a `sku` or a `bundle`.
   *
   * _⚠️ `bundle` is not fully implemented._
   *
   * @default sku
   */
  @Prop({ reflect: true, mutable: true }) kind?: "sku" | "bundle" = "sku"

  /**
   * The SKU or bundle code (i.e. the unique identifier of the product or bundle whose availability you want to display).
   */
  @Prop({ reflect: true }) code!: string | undefined

  /**
   * The rule used to determine the information that will be displayed.
   * `cheapest` is the delivery lead time associated with the lower shipping method cost,
   * `fastest` is the delivery lead time associated with the lower average time to delivery.
   */
  @Prop({ reflect: true }) rule: "cheapest" | "fastest" = "cheapest"

  @State() cart: Order | undefined

  async componentWillLoad(): Promise<void> {
    logCode(this.host, this.code)

    this.cart = (await getCart()) ?? undefined
    await this.updateAvailability(this.kind, this.code)

    listenTo("cl-cart-update", (event) => {
      this.cart = event.detail.response
      void this.updateAvailability(this.kind, this.code)
    })

    listenTo("cl-cart-hostedcartupdate", (event) => {
      this.cart = event.detail.response
      void this.updateAvailability(this.kind, this.code)
    })
  }

  @Watch("kind")
  async watchKindHandler(newValue: typeof this.kind): Promise<void> {
    if (newValue == null) {
      this.kind = this.kindDefault
      return
    }

    logUnion(this.host, "kind", newValue, this.kindList)
    await this.debouncedUpdateAvailability(newValue, this.code)
  }

  @Watch("code")
  async watchPropHandler(newValue: typeof this.code): Promise<void> {
    logCode(this.host, newValue)
    await this.debouncedUpdateAvailability(this.kind, newValue)
  }

  private readonly updateAvailability = async (
    kind: typeof this.kind,
    code: typeof this.code,
  ): Promise<void> => {
    let sku: Sku | undefined

    if (kind !== "bundle" && isValidCode(code)) {
      sku = await getSku(code)
    }

    this.host
      .querySelectorAll("cl-availability-status, cl-availability-info")
      .forEach((element) => {
        element.dispatchEvent(
          new CustomEvent<AvailabilityUpdateEventPayload>(
            "availabilityUpdate",
            {
              detail: {
                sku,
                rule: this.rule,
                cartQuantity: getCartQuantity(this.cart, kind, code),
              },
            },
          ),
        )
      })
  }

  private readonly debouncedUpdateAvailability = debounce(
    this.updateAvailability,
    10,
  )

  render(): JSX.Element {
    return <slot />
  }
}
