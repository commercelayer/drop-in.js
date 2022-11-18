import { getPrice, Price } from '#apis/commercelayer/prices'
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

  @Prop({ reflect: true }) code: string | undefined

  async componentWillLoad(): Promise<void> {
    if (validateCode(this.code)) {
      const price = await getPrice(this.code)

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
