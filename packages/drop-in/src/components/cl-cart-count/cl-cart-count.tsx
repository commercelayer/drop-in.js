import { getCart } from '#apis/commercelayer/cart'
import type { Order } from '@commercelayer/sdk'
import { Component, h, Host, JSX, Listen, Prop, State } from '@stencil/core'

@Component({
  tag: 'cl-cart-count',
  shadow: true
})
export class ClCartCount {
  @Prop({ reflect: true }) hideWhenEmpty: boolean = false

  @State() count: number | undefined

  async componentWillLoad(): Promise<void> {
    await this.updateCart(null)
  }

  @Listen('cartUpdate', { target: 'window' })
  cartUpdateHandler(event: CustomEvent<{ order: Order }>): void {
    void this.updateCart(event.detail.order)
  }

  @Listen('hostedCartUpdate', { target: 'window' })
  hostedCartUpdateHandler(event: CustomEvent<{ order: Order }>): void {
    void this.updateCart(event.detail.order)
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
    const value =
      this.count !== undefined ? this.count : this.hideWhenEmpty ? undefined : 0
    return <Host quantity={this.count}>{value}</Host>
  }
}
