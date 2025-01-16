import { getBundle } from '#apis/commercelayer/bundles'
import { addItem } from '#apis/commercelayer/cart'
import { getSku } from '#apis/commercelayer/skus'
import type { Inventory } from '#apis/types'
import { log } from '#utils/logger'
import {
  isValidCode,
  isValidQuantity,
  logCode,
  logUnion,
  unionToTuple
} from '#utils/validation-helpers'
import {
  Component,
  Element,
  Host,
  Prop,
  State,
  Watch,
  h,
  type JSX
} from '@stencil/core'
import debounce from 'lodash/debounce'

@Component({
  tag: 'cl-add-to-cart',
  shadow: true
})
export class CLAddToCart {
  @Element() host!: HTMLElement

  private readonly kindList = unionToTuple<typeof this.kind>()('sku', 'bundle')

  private readonly kindDefault: NonNullable<typeof this.kind> = 'sku'

  /**
   * Indicates whether the code refers to a `sku` or a `bundle`.
   * @default sku
   */
  @Prop({ reflect: true, mutable: true }) kind?: 'sku' | 'bundle' = 'sku'

  /**
   * The SKU or bundle code (i.e. the unique identifier of the product or bundle you want to add to the shopping cart).
   */
  @Prop({ reflect: true }) code!: string | undefined

  /**
   * The number of units of the selected product you want to add to the shopping cart.
   * @default 1
   */
  @Prop({ reflect: true, mutable: true }) quantity: number = 1

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

  @State() inventory: Inventory | undefined

  async componentWillLoad(): Promise<void> {
    await this.updateSku(this.code)
    await this.updateQuantity(this.quantity)
  }

  @Watch('kind')
  async watchKindHandler(newValue: typeof this.kind): Promise<void> {
    if (newValue == null) {
      this.kind = this.kindDefault
      return
    }

    logUnion(this.host, 'kind', newValue, this.kindList)
  }

  @Watch('code')
  async watchCodeHandler(newValue: typeof this.code): Promise<void> {
    await this.debouncedUpdateSku(newValue)
  }

  @Watch('quantity')
  async watchQuantityHandler(newValue: typeof this.quantity): Promise<void> {
    await this.updateQuantity(newValue)
  }

  private readonly updateSku = async (
    code: typeof this.code
  ): Promise<void> => {
    logCode(this.host, code)

    if (isValidCode(code)) {
      switch (this.kind) {
        case 'bundle':
          this.inventory = (await getBundle(code))?.inventory
          if (this.inventory === undefined) {
            log('warn', `Cannot find code ${code}.`, this.host)
          }
          break

        case 'sku':
        default:
          this.inventory = (await getSku(code))?.inventory
          if (this.inventory === undefined) {
            log('warn', `Cannot find code ${code}.`, this.host)
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
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleAddItem()
    }
  }

  handleAddItem(): void {
    if (this.code !== undefined && this.canBeSold()) {
      addItem(this.kind ?? this.kindDefault, this.code, this.quantity, {
        name: this.name,
        image_url: this.imageUrl,
        frequency: this.frequency
      }).catch((error) => {
        throw error
      })
    }
  }

  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold(): boolean {
    const hasQuantity =
      this.inventory?.quantity === undefined ||
      this.quantity <= this.inventory?.quantity

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
        role='button'
        tabindex='0'
        aria-disabled={this.canBeSold() ? undefined : 'true'}
        onKeyPress={(event: KeyboardEvent) => {
          this.handleKeyPress(event)
        }}
        onClick={() => {
          this.handleAddItem()
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
