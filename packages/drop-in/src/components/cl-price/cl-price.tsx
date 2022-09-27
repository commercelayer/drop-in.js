import type { Price } from '@commercelayer/sdk'
import { Component, Prop, h, Listen, Element } from '@stencil/core'
import { log } from '../../utils/logger'

@Component({
  tag: 'cl-price',
  shadow: true,
})
export class CLPrice {
  /**
   * Sku code
   */
  @Prop() sku: string | undefined

  @Element()
  host!: HTMLElement

  componentWillLoad() {
    if (typeof this.sku !== 'string') {
      log('warn', '"sku" should be a string.', this.host)
    }
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
