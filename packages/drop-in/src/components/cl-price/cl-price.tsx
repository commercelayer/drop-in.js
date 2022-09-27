import { Price } from '@commercelayer/sdk'
import { Component, Prop, h, Listen, Element } from '@stencil/core';

@Component({
  tag: 'cl-price',
  shadow: true,
})
export class CLPrice {
  /**
   * Sku code
   */
  @Prop() sku: string | undefined;

  @Element()
  host!: HTMLElement

  @Listen('priceUpdate')
  priceUpdateHandler({ type, detail }: CustomEvent<Price>) {
    this.host.querySelectorAll('cl-price-amount, cl-price-compare-at-amount').forEach(element => {
      element.dispatchEvent(new CustomEvent<Price>(type, { detail }))
    })
  }

  render() {
    return (
      <slot></slot>
    );
  }
}
