import { addItem } from '#apis/commercelayer/cart'
import { getSku } from '#apis/commercelayer/skus'
import { log } from '#utils/logger'
import {
  logQuantity,
  logSku,
  validateQuantity,
  validateSku
} from '#utils/validation-helpers'
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

  @Prop({ reflect: true }) sku: string | undefined
  @Prop({ reflect: true, mutable: true }) quantity: number = 1

  @State() skuObject: Sku | undefined

  @Watch('sku')
  watchSkuHandler(newValue: string, _oldValue: string): void {
    logSku(this.host, newValue)
  }

  @Watch('quantity')
  watchQuantityHandler(newValue: number, _oldValue: number): void {
    if (!validateQuantity(newValue)) {
      this.quantity = 0
    }
  }

  async componentWillLoad(): Promise<void> {
    if (validateSku(this.sku)) {
      this.skuObject = await getSku(this.sku)
      if (this.skuObject === undefined) {
        log('warn', `Cannot find sku ${this.sku}.`, this.host)
      }
    }

    logSku(this.host, this.sku)
    logQuantity(this.host, this.quantity)
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
      validateSku(this.sku) &&
      this.quantity > 0 &&
      // @ts-expect-error
      this.skuObject?.inventory?.available === true &&
      // @ts-expect-error
      this.quantity <= this.skuObject?.inventory?.quantity
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
