import { Price } from '@commercelayer/sdk'
import { Component, h, Listen, State, Host } from '@stencil/core';

@Component({
  tag: 'cl-price-amount',
  shadow: true,
})
export class CLPriceAmount {
  @State() price: string | undefined;

  @Listen('priceUpdate')
  priceUpdateHandler(event: CustomEvent<Price>) {
    this.price = event.detail.formatted_amount
  }

  render() {
    return (
      <Host>
        {this.price}
      </Host>
    );
  }
}
