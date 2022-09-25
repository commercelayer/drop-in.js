import { Price } from '@commercelayer/sdk'
import { Component, Prop, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'cl-price',
  styleUrl: 'cl-price.css',
  shadow: true,
})
export class CLPrice {
  /**
   * Sku code
   */
  @Prop() sku: string | undefined;

  @State() formatted_amount: string | undefined;
  @State() formatted_compare_at_amount: string | undefined;

  @Listen('priceFetched')
  todoCompletedHandler(event: CustomEvent<Price>) {
    this.formatted_amount = event.detail.formatted_amount
    this.formatted_compare_at_amount = event.detail.formatted_compare_at_amount
  }

  render() {
    return (
      <div>
        <s>{this.formatted_compare_at_amount}</s>
        {this.formatted_amount}
      </div>
    );
  }
}
