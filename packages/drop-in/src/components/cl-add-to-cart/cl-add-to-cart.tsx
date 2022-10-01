import { addItem } from '#apis/commercelayer/cart'
import { log } from '#utils/logger'
import { Component, Prop, h, Element, Watch } from '@stencil/core'

@Component({
  tag: 'cl-add-to-cart',
  shadow: true,
})
export class CLAddToCart {
  /**
   * Sku code
   */
  @Prop({ reflect: true }) sku: string | undefined

  /**
   * Quantity
   */
  @Prop({ reflect: true, mutable: true }) quantity: number = 1

  @Element()
  host!: HTMLElement

  logSku(sku: string | undefined): void {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not empty string.', this.host)
    }
  }

  logQuantity(quantity: number): void {
    if (!this.validateQuantity(quantity)) {
      log('warn', '"quantity" should be a number greater than 0.', this.host)
    }
  }

  validateSku(sku: string | undefined): sku is string {
    return typeof sku === 'string' && sku !== ''
  }

  validateQuantity(quantity: number): boolean {
    return quantity >= 1
  }

  @Watch('sku')
  watchSkuHandler(newValue: string, _oldValue: string) {
    this.logSku(newValue)
  }

  @Watch('quantity')
  watchQuantityHandler(newValue: number, _oldValue: number) {
    if (!this.validateQuantity(newValue)) {
      this.quantity = 1
    }
  }

  componentWillLoad() {
    this.logSku(this.sku)
    this.logQuantity(this.quantity)
  }

  async handleClick(_event: MouseEvent) {
    if (this.validateSku(this.sku)) {
      await addItem(this.sku, this.quantity)
    }
  }

  render() {
    // TODO: check for stock
    const enabled = this.validateSku(this.sku) && this.validateQuantity(this.quantity)

    return (
      <button disabled={!enabled} onClick={ev => this.handleClick(ev)}>
        <slot></slot>
      </button>
    )
  }
}
