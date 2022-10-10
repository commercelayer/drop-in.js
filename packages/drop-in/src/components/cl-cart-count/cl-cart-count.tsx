import { triggerCartUpdate } from '#apis/commercelayer/cart'
import type { Order } from '@commercelayer/sdk'
import { Component, h, Host, JSX, Listen, State } from '@stencil/core'

@Component({
  tag: 'cl-cart-count',
  shadow: true
})
export class ClCartCount {
  @State() count: number | undefined

  async componentWillLoad(): Promise<void> {
    await triggerCartUpdate(null)
  }

  @Listen('cartUpdate', { target: 'window' })
  cartUpdateHandler(event: CustomEvent<Order>): void {
    if (event.detail.skus_count !== undefined && event.detail.skus_count > 0) {
      this.count = event.detail.skus_count
    }
  }

  render(): JSX.Element {
    return <Host quantity={this.count}>{this.count}</Host>
  }
}
