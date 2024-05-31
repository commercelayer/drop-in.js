import { getCart } from '#apis/commercelayer/cart'
import { listenTo } from '#apis/event'
import type { Order } from '@commercelayer/sdk'
import { Component, Host, Prop, State, h, type JSX } from '@stencil/core'

@Component({
  tag: 'cl-cart-count',
  shadow: true
})
export class ClCartCount {
  /**
   * Toggle this switch to hide the counter when the cart is empty instead of showing `0`.
   */
  @Prop({ reflect: true }) hideWhenEmpty: boolean = false

  @State() count: number | undefined

  async componentWillLoad(): Promise<void> {
    listenTo('cl-cart-update', (event) => {
      void this.updateCart(event.detail.response)
    })

    listenTo('cl-cart-hostedcartupdate', (event) => {
      void this.updateCart(event.detail.response)
    })

    await this.updateCart(await getCart())
  }

  private async updateCart(cart: Order | null): Promise<void> {
    const itemCount = cart?.line_items
      ?.filter(
        (item) => item.item_type === 'skus' || item.item_type === 'bundles'
      )
      .reduce((count, item) => count + item.quantity, 0)

    // TODO: `skus_count` counts SKUs inside the bundle (this could be a future option).
    // if (cart?.skus_count != null && cart.skus_count > 0) {
    //   this.count = cart.skus_count
    // }

    if (itemCount != null && itemCount > 0) {
      this.count = itemCount
    } else {
      this.count = undefined
    }
  }

  render(): JSX.Element {
    const value = this.count ?? (this.hideWhenEmpty ? undefined : 0)
    return <Host quantity={this.count}>{value}</Host>
  }
}
