import { getPrice } from '#apis/commercelayer/prices'
import { isValidCode, logCode } from '#utils/validation-helpers'
import type { Price } from '@commercelayer/sdk'
import { Component, Element, Prop, Watch, h, type JSX } from '@stencil/core'

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice {
  @Element() host!: HTMLElement

  /**
   * The SKU code (i.e. the unique identifier of the product whose price you want to display).
   */
  @Prop({ reflect: true }) code!: string | undefined

  async componentWillLoad(): Promise<void> {
    logCode(this.host, this.code)
    await this.updatePrice(this.code)
  }

  @Watch('code')
  async watchPropHandler(newValue: string, _oldValue: string): Promise<void> {
    logCode(this.host, newValue)
    await this.updatePrice(newValue)
  }

  private async updatePrice(code: string | undefined): Promise<void> {
    if (isValidCode(code)) {
      const price = await getPrice(code)

      if (price !== undefined) {
        this.host.querySelectorAll('cl-price-amount').forEach((element) => {
          element.dispatchEvent(
            new CustomEvent<Price>('priceUpdate', { detail: price })
          )
        })
      }
    }
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
