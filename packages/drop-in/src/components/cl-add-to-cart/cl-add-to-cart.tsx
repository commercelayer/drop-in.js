import { addItem } from '#apis/commercelayer/cart'
import { log } from '#utils/logger'
import { Component, Element, h, Host, Prop, Watch } from '@stencil/core'

@Component({
  tag: 'cl-add-to-cart',
  shadow: true,
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

  logSku(sku: string | undefined): void {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not empty string.', this.host)
    }
  }

  logQuantity(quantity: number): void {
    if (!this.validateQuantity(quantity)) {
      log('warn', '"quantity" should be a number equal or greater than 0.', this.host)
    }
  }

  validateSku(sku: string | undefined): sku is string {
    return typeof sku === 'string' && sku !== ''
  }

  validateQuantity(quantity: number): boolean {
    return quantity >= 0
  }

  @Watch('sku')
  watchSkuHandler(newValue: string, _oldValue: string) {
    this.logSku(newValue)
  }

  @Watch('quantity')
  watchQuantityHandler(newValue: number, _oldValue: number) {
    if (!this.validateQuantity(newValue)) {
      this.quantity = 0
    }
  }

  componentWillLoad() {
    this.logSku(this.sku)
    this.logQuantity(this.quantity)
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleAddItem()
    }
  }

  handleAddItem() {
    if (this.sku && this.canBeSold()) {
      addItem(this.sku, this.quantity)
    }
  }

  /**
   * Check whether the sku is soldable.
   * @returns Returns true when item is soldable.
   */
  canBeSold() {
    // TODO: check for stock
    return this.validateSku(this.sku) && this.quantity > 0
  }

  render() {
    const enabled = this.canBeSold()

    return (
      <Host
        role='button'
        tabindex='0'
        aria-disabled={enabled ? undefined : 'true'}
        onKeyPress={(event: KeyboardEvent) => this.handleKeyPress(event)}
        onClick={() => this.handleAddItem()} >
        <slot></slot>
      </Host>
    )
  }
}
