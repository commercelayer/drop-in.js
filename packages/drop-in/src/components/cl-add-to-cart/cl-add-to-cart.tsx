import { addItem } from '#apis/commercelayer/cart'
import { getSku } from '#apis/commercelayer/skus'
import type { Sku } from '#apis/types'
import { log } from '#utils/logger'
import {
  isValidCode,
  isValidQuantity,
  logCode
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

@Component({
  tag: 'cl-add-to-cart',
  shadow: true
})
export class CLAddToCart {
  @Element() host!: HTMLElement

  /**
   * The SKU code (i.e. the unique identifier of the product you want to add to the shopping cart).
   */
  @Prop({ reflect: true }) code!: string | undefined

  /**
   * The number of units of the selected product you want to add to the shopping cart.
   */
  @Prop({ reflect: true, mutable: true }) quantity: number = 1

  @State() skuObject: Sku | undefined

  async componentWillLoad(): Promise<void> {
    await this.updateSku(this.code)
    await this.updateQuantity(this.quantity)
  }

  @Watch('code')
  async watchCodeHandler(newValue: typeof this.code): Promise<void> {
    await this.updateSku(newValue)
  }

  @Watch('quantity')
  async watchQuantityHandler(newValue: typeof this.quantity): Promise<void> {
    await this.updateQuantity(newValue)
  }

  private async updateSku(code: typeof this.code): Promise<void> {
    logCode(this.host, code)

    if (isValidCode(code)) {
      this.skuObject = await getSku(code)
      if (this.skuObject === undefined) {
        log('warn', `Cannot find code ${code}.`, this.host)
      }
    }
  }

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
      addItem(this.code, this.quantity).catch((error) => {
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
      this.skuObject?.inventory?.quantity === undefined ||
      this.quantity <= this.skuObject?.inventory?.quantity

    return (
      isValidCode(this.code) &&
      this.quantity > 0 &&
      this.skuObject?.inventory?.available === true &&
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
