import { getCartUrl } from '#apis/commercelayer/cart'
import { Component, Prop, h, Element, State } from '@stencil/core'

@Component({
  tag: 'cl-cart-link',
  shadow: true,
})
export class CLCartLink {
  @Element() host!: HTMLElement

  /**
   * Target
   */
  @Prop() target: string | undefined

  @State() href: string | undefined

  async componentWillLoad() {
    this.href = await getCartUrl()
  }

  render() {
    return (
      <a target={this.target} href={this.href}>
        <slot></slot>
      </a>
    )
  }
}
