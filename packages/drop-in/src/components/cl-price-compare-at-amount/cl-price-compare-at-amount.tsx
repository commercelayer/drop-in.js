import { Price } from '@commercelayer/sdk'
import { Component, h, Listen, State, Host } from '@stencil/core';

@Component({
  tag: 'cl-price-compare-at-amount',
  shadow: true,
})
export class CLPriceCompareAtAmount {
  @State() price: string | undefined;

  @Listen('priceUpdate')
  priceUpdateHandler(event: CustomEvent<Price>) {
    this.price = event.detail.formatted_compare_at_amount
  }

  render() {
    return (
      <Host>
        {this.price}
      </Host>
    );
  }
}
