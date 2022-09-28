import { log } from '#utils/logger'
import type { Price } from '@commercelayer/sdk'
import { Component, Element, h, Listen, Prop, Watch } from '@stencil/core'

@Component({
  tag: 'cl-price',
  shadow: true,
})
export class CLPrice {
  /**
   * Sku code
   */
  @Prop({ reflect: true }) sku: string | undefined

  @Element() host!: HTMLElement

  private validateSku(sku: string | undefined) {
    if (typeof sku !== 'string') {
      log('warn', '"sku" should be a string.', this.host)
    }
  }

  componentWillLoad() {
    this.validateSku(this.sku)
  }

  @Watch('sku')
  watchPropHandler(newValue: string, oldValue: string) {
    this.validateSku(newValue)
    console.log('The new value of activated is: ', newValue, 'value was: ', oldValue)
  }

  @Listen('priceUpdate')
  priceUpdateHandler({ type, detail }: CustomEvent<Price>) {
    this.host.querySelectorAll('cl-price-amount').forEach(element => {
      element.dispatchEvent(new CustomEvent<Price>(type, { detail }))
    })
  }

  render() {
    return (
      <slot></slot>
    )
  }
}
