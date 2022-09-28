import { Price } from '@commercelayer/sdk'
import { Component, h, Listen, State, Host, Prop } from '@stencil/core';

@Component({
  tag: 'cl-price-amount',
  shadow: true,
})
export class CLPriceAmount {

  @Prop({ reflect: true }) type: 'price' | 'compare-at' = 'price'

  @State() price: string | undefined;

  @Listen('priceUpdate')
  priceUpdateHandler(event: CustomEvent<Price>) {
    switch (this.type) {
      case 'compare-at':
        this.price = event.detail.formatted_compare_at_amount
        break

      case 'price':
        this.price = event.detail.formatted_amount
        break

      default:
        break
    }
  }

  render() {
    return (
      <Host>
        {this.price}
      </Host>
    );
  }
}
