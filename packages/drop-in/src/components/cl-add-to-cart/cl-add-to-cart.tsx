import { addItem } from '#apis/commercelayer/cart'
import { getSku } from '#apis/commercelayer/skus'
import { log } from '#utils/logger'
import type { Sku } from '@commercelayer/sdk'
import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Prop,
  State,
  Watch
} from '@stencil/core'

@Component({
  tag: 'cl-add-to-cart',
  shadow: true
})
export class CLAddToCart {
  @Element() host!: HTMLElement

  /**
   * Sku code
   */
  @Prop({ reflect: true }) sku: string | undefined

  /**
   * Quantity
   */
  @Prop({ reflect: true, mutable: true }) quantity: number = 1

  @State() skuObject: Sku | undefined

  logSku(sku: string | undefined): void {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not empty string.', this.host)
    }
  }

  logQuantity(quantity: number): void {
    if (!this.validateQuantity(quantity)) {
      log(
        'warn',
        '"quantity" should be a number equal or greater than 0.',
        this.host
      )
    }
  }

  validateSku(sku: string | undefined): sku is string {
    return typeof sku === 'string' && sku !== ''
  }

  validateQuantity(quantity: number): boolean {
    return quantity >= 0
  }

  @Watch('sku')
  watchSkuHandler(newValue: string, _oldValue: string): void {
    this.logSku(newValue)
  }

  @Watch('quantity')
  watchQuantityHandler(newValue: number, _oldValue: number): void {
    if (!this.validateQuantity(newValue)) {
      this.quantity = 0
    }
  }

  async componentWillLoad(): Promise<void> {
    if (this.validateSku(this.sku)) {
      this.skuObject = await getSku(this.sku)
      if (this.skuObject === undefined) {
        log('warn', `Cannot find sku ${this.sku}.`, this.host)
      }
    }

    this.logSku(this.sku)
    this.logQuantity(this.quantity)
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleAddItem()
    }
  }

  handleAddItem(): void {
    if (this.sku !== undefined && this.canBeSold()) {
      addItem(this.sku, this.quantity).catch((error) => {
        throw error
      })
    }
  }

  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold(): boolean {
    // TODO: check for stock
    return (
      this.validateSku(this.sku) &&
      this.quantity > 0 &&
      // @ts-expect-error
      this.skuObject?.inventory?.available === true
    )
  }

  render(): JSX.Element {
    const enabled = this.canBeSold()

    return (
      <Host
        role='button'
        tabindex='0'
        aria-disabled={enabled ? undefined : 'true'}
        onKeyPress={(event: KeyboardEvent) => this.handleKeyPress(event)}
        onClick={() => this.handleAddItem()}
      >
        <slot></slot>
      </Host>
    )
  }
}
