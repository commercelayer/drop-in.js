import { getPrice } from '#apis/commercelayer/prices'
import { logSku, validateSku } from '#utils/validation-helpers'
import type { Price } from '@commercelayer/sdk'
import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core'

export interface Props {
  sku: string | undefined
}

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) sku: string | undefined

  async componentWillLoad(): Promise<void> {
    if (validateSku(this.sku)) {
      const price = await getPrice(this.sku)

      if (price !== undefined) {
        this.updatePrice(price)
      }
    }

    logSku(this.host, this.sku)
  }

  @Watch('sku')
  watchPropHandler(newValue: string, _oldValue: string): void {
    logSku(this.host, newValue)
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
