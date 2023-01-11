import { addItem } from '#apis/commercelayer/cart'
import { getSku } from '#apis/commercelayer/skus'
import type { Sku } from '#apis/types'
import { log } from '#utils/logger'
import {
  logCode,
  logQuantity,
  validateCode,
  validateQuantity
} from '#utils/validation-helpers'
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

export interface Props {
  code: string | undefined
  quantity: number
}
@Component({
  tag: 'cl-add-to-cart',
  shadow: true
})
export class CLAddToCart implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) code: string | undefined
  @Prop({ reflect: true, mutable: true }) quantity: number = 1

  @State() skuObject: Sku | undefined

  @Watch('code')
  async watchCodeHandler(newValue: string, _oldValue: string): Promise<void> {
    logCode(this.host, newValue)
    await this.updateSku(newValue)
  }

  @Watch('quantity')
  watchQuantityHandler(newValue: number, _oldValue: number): void {
    if (!validateQuantity(newValue)) {
      this.quantity = 0
    }
  }

  private async updateSku(code: string | undefined): Promise<void> {
    if (validateCode(code)) {
      this.skuObject = await getSku(code)
      if (this.skuObject === undefined) {
        log('warn', `Cannot find code ${code}.`, this.host)
      }
    }
  }

  async componentWillLoad(): Promise<void> {
    logCode(this.host, this.code)
    logQuantity(this.host, this.quantity)
    await this.updateSku(this.code)
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
      validateCode(this.code) &&
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
        onKeyPress={(event: KeyboardEvent) => this.handleKeyPress(event)}
        onClick={() => this.handleAddItem()}
      >
        <slot></slot>
      </Host>
    )
  }
}
