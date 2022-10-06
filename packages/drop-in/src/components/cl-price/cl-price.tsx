import { log } from '#utils/logger'
import type { Price } from '@commercelayer/sdk'
import { Component, Element, h, JSX, Listen, Prop, Watch } from '@stencil/core'

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice {
  /**
   * Sku code
   */
  @Prop({ reflect: true }) sku: string | undefined

  @Element() host!: HTMLElement

  logSku(sku: string | undefined): void {
    if (!this.validateSku(sku)) {
      log('warn', '"sku" should be a not string.', this.host)
    }
  }

  validateSku(sku: string | undefined): sku is string {
    return typeof sku === 'string' && sku !== ''
  }

  componentWillLoad(): void {
    this.logSku(this.sku)
  }

  @Watch('sku')
  watchPropHandler(newValue: string, _oldValue: string): void {
    this.logSku(newValue)
  }

  @Listen('priceUpdate')
  priceUpdateHandler({ type, detail }: CustomEvent<Price>): void {
    this.host.querySelectorAll('cl-price-amount').forEach((element) => {
      element.dispatchEvent(new CustomEvent<Price>(type, { detail }))
    })
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
