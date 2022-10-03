import { getCartUrl, isValidUrl } from '#apis/commercelayer/cart'
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
  @Prop({ reflect: true }) target: string = '_self'

  @State() href: string | undefined

  async componentWillLoad() {
    this.href = await getCartUrl()
  }

  async handleClick(event: MouseEvent) {
    if (!this.href || !isValidUrl(this.href)) {
      event.preventDefault()
      this.href = await getCartUrl(true)
      window.open(this.href, this.target)
    }
  }

  render() {
    return (
      <a target={this.target} href={this.href} onClick={e => this.handleClick(e)}>
        <slot></slot>
      </a>
    )
  }
}
