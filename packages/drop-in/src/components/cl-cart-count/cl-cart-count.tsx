import { getCart } from '#apis/commercelayer/cart'
import { listenTo } from '#apis/event'
import type { Order } from '@commercelayer/sdk'
import { Component, h, Host, JSX, Prop, State } from '@stencil/core'

@Component({
  tag: 'cl-cart-count',
  shadow: true
})
export class ClCartCount {
  @Prop({ reflect: true }) hideWhenEmpty: boolean = false

  @State() count: number | undefined

  async componentWillLoad(): Promise<void> {
    listenTo('cl.cart.update', (event) => {
      void this.updateCart(event.detail.response)
    })

    listenTo('cl.cart.hostedCartUpdate', (event) => {
      void this.updateCart(event.detail.response)
    })

    await this.updateCart(null)
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
