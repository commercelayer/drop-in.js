import type { Order } from "@commercelayer/sdk"
import {
  Component,
  Element,
  Host,
  // biome-ignore lint/correctness/noUnusedImports: "h" is used in the render method
  h,
  type JSX,
  Prop,
  State,
  Watch,
} from "@stencil/core"
import { debounce } from "lodash-es"
import { getBundle } from "#apis/commercelayer/bundles"
import { addItem, getCart, getCartQuantity } from "#apis/commercelayer/cart"
import { getSku } from "#apis/commercelayer/skus"
import { listenTo } from "#apis/event"
import type { Inventory } from "#apis/types"
import { log } from "#utils/logger"
import {
  isValidCode,
  isValidQuantity,
  logCode,
  logUnion,
  unionToTuple,
} from "#utils/validation-helpers"

@Component({
  tag: "cl-add-to-cart",
  shadow: true,
})
export class ClAddToCart {
  @Element() host!: HTMLClAddToCartElement

  private readonly kindList = unionToTuple<typeof this.kind>()("sku", "bundle")

  private readonly kindDefault: NonNullable<typeof this.kind> = "sku"

  /**
   * Indicates whether the code refers to a `sku` or a `bundle`.
   * @default sku
   */
  @Prop({ reflect: true, mutable: true }) kind?: "sku" | "bundle" = "sku"

  /**
   * The SKU or bundle code (i.e. the unique identifier of the product or bundle you want to add to the shopping cart).
   */
  @Prop({ reflect: true }) code!: string | undefined

  /**
   * The number of units of the selected product you want to add to the shopping cart.
   * @default 1
   */
  @Prop({ reflect: true, mutable: true }) quantity = 1

  /**
   * A custom name for the product or bundle that will be added to the cart.
   * If not provided, the name will be taken from the item being added.
   */
  @Prop({ reflect: true }) name: string | undefined

  /**
   * A custom image URL for the product or bundle that will be added to the cart.
   * If not provided, the image URL will be taken from the item being added.
   */
  @Prop({ reflect: true }) imageUrl: string | undefined

  /**
   * The frequency which generates a [subscription](https://docs.commercelayer.io/core/v/how-tos/placing-orders/subscriptions). The value must be supported by the associated subscription model.
   */
  @Prop({ reflect: true }) frequency: string | undefined

  /**
   * The item is currently being added to the cart.
   * @default false
   */
  @State() busy = false

  @State() inventory: Inventory | undefined

  @State() cart: Order | undefined

  async componentWillLoad(): Promise<void> {
    await this.updateSku(this.code)
    await this.updateQuantity(this.quantity)

    this.cart = (await getCart()) ?? undefined

    listenTo("cl-cart-update", (event) => {
      const [kind, code] = event.detail.request.args

      this.cart = event.detail.response

      if (kind === this.kind && code === this.code) {
        this.busy = false
      }
    })

    listenTo("cl-cart-hostedcartupdate", (event) => {
      this.cart = event.detail.response
    })
  }

  @Watch("kind")
  async watchKindHandler(newValue: typeof this.kind): Promise<void> {
    if (newValue == null) {
      this.kind = this.kindDefault
      return
    }

    logUnion(this.host, "kind", newValue, this.kindList)
  }

  @Watch("code")
  async watchCodeHandler(newValue: typeof this.code): Promise<void> {
    await this.debouncedUpdateSku(newValue)
  }

  @Watch("quantity")
  async watchQuantityHandler(newValue: typeof this.quantity): Promise<void> {
    await this.updateQuantity(newValue)
  }

  private readonly updateSku = async (
    code: typeof this.code,
  ): Promise<void> => {
    logCode(this.host, code)

    if (isValidCode(code)) {
      switch (this.kind) {
        case "bundle":
          this.inventory = (await getBundle(code))?.inventory
          if (this.inventory === undefined) {
            log("warn", `Cannot find code ${code}.`, this.host)
          }
          break
        default:
          this.inventory = (await getSku(code))?.inventory
          if (this.inventory === undefined) {
            log("warn", `Cannot find code ${code}.`, this.host)
          }
          break
      }
    }
  }

  private readonly debouncedUpdateSku = debounce(this.updateSku, 10)

  private async updateQuantity(quantity: typeof this.quantity): Promise<void> {
    if (!isValidQuantity(quantity)) {
      this.quantity = 0
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      this.handleAddItem()
    }
  }

  handleAddItem(): void {
    if (this.code !== undefined && this.canBeSold() && !this.busy) {
      this.busy = true
      addItem(this.kind ?? this.kindDefault, this.code, this.quantity, {
        name: this.name,
        image_url: this.imageUrl,
        frequency: this.frequency,
      }).catch((error) => {
        this.busy = false
        throw error
      })
    }
  }

  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold(): boolean {
    const cartQuantity = getCartQuantity(this.cart, this.kind, this.code)

    const hasQuantity =
      this.inventory?.quantity === undefined ||
      this.quantity <= this.inventory.quantity - cartQuantity

    return (
      isValidCode(this.code) &&
      this.quantity > 0 &&
      this.inventory?.available === true &&
      hasQuantity
    )
  }

  render(): JSX.Element {
    return (
      <Host
        role="button"
        tabindex="0"
        aria-disabled={this.canBeSold() && !this.busy ? undefined : "true"}
        aria-busy={this.busy ? "true" : undefined}
        onKeyPress={(event: KeyboardEvent) => {
          this.handleKeyPress(event)
        }}
        onClick={() => {
          this.handleAddItem()
        }}
      >
        <slot />
      </Host>
    )
  }
}
