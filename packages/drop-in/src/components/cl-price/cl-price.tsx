import { getPrice as getBundlePrice } from '#apis/commercelayer/bundles'
import { getPrice as getSkuPrice, Price } from '#apis/commercelayer/prices'
import { logCode, validateCode } from '#utils/validation-helpers'
import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core'

export interface Props {
  code: string | undefined
}

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) kind: 'sku' | 'bundle' = 'sku'
  @Prop({ reflect: true }) code: string | undefined

  async componentWillLoad(): Promise<void> {
    if (validateCode(this.code)) {
      let price

      switch (this.kind) {
        case 'sku':
          price = await getSkuPrice(this.code)
          break

        case 'bundle':
          price = await getBundlePrice(this.code)
          break

        default:
          break
      }

      if (price !== undefined) {
        this.updatePrice(price)
      }
    }

    logCode(this.host, this.code)
  }

  @Watch('code')
  watchPropHandler(newValue: string, _oldValue: string): void {
    logCode(this.host, newValue)
  }

  private updatePrice(price: Price): void {
    this.host.querySelectorAll('cl-price-amount').forEach((element) => {
      element.dispatchEvent(
        new CustomEvent<Price>('priceUpdate', { detail: price })
      )
    })
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
