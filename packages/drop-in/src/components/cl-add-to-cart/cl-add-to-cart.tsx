import { addItem } from '#apis/commercelayer/cart'
import { getSku, Sku } from '#apis/commercelayer/skus'
import { log } from '#utils/logger'
import {
  logQuantity,
  logCode,
  validateQuantity,
  validateCode
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
  watchCodeHandler(newValue: string, _oldValue: string): void {
    logCode(this.host, newValue)
  }

  @Watch('quantity')
  watchQuantityHandler(newValue: number, _oldValue: number): void {
    if (!validateQuantity(newValue)) {
      this.quantity = 0
    }
  }

  async componentWillLoad(): Promise<void> {
    if (validateCode(this.code)) {
      this.skuObject = await getSku(this.code)
      if (this.skuObject === undefined) {
        log('warn', `Cannot find code ${this.code}.`, this.host)
      }
    }

    logCode(this.host, this.code)
    logQuantity(this.host, this.quantity)
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
