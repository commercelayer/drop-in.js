import { getCart } from '#apis/commercelayer/cart'
import type { Order } from '@commercelayer/sdk'
import { Component, h, Host, JSX, Listen, State } from '@stencil/core'

@Component({
  tag: 'cl-cart-count',
  shadow: true
})
export class ClCartCount {
  @State() count: number | undefined

  async componentWillLoad(): Promise<void> {
    await this.updateCart(null)
  }

  @Listen('cartUpdate', { target: 'window' })
  cartUpdateHandler(event: CustomEvent<Order>): void {
    void this.updateCart(event.detail)
  }

  private async updateCart(cart: Order | null): Promise<void> {
    cart ||= await getCart()
    if (cart?.skus_count !== undefined && cart.skus_count > 0) {
      this.count = cart.skus_count
    } else {
      this.count = undefined
    }
  }

  render(): JSX.Element {
    return <Host quantity={this.count}>{this.count}</Host>
  }
}
