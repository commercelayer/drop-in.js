import { getCartUrl, isValidUrl } from '#apis/commercelayer/cart'
import type { Order } from '@commercelayer/sdk'
import { Component, Element, h, JSX, Listen, Prop, State } from '@stencil/core'

@Component({
  tag: 'cl-cart-link',
  shadow: true
})
export class CLCartLink {
  @Element() host!: HTMLElement

  /**
   * Target
   */
  @Prop({ reflect: true }) target: string = '_self'

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    this.href = await getCartUrl()
  }

  async handleClick(event: MouseEvent): Promise<void> {
    if (this.href === undefined || !isValidUrl(this.href)) {
      event.preventDefault()
      this.href = await getCartUrl(true)
      window.open(this.href, this.target)
    }
  }

  @Listen('cartUpdate', { target: 'window' })
  async cartUpdateHandler(_event: CustomEvent<Order>): Promise<void> {
    if (this.href === undefined || !isValidUrl(this.href)) {
      this.href = await getCartUrl()
    }
  }

  render(): JSX.Element {
    return (
      <a
        target={this.target}
        href={this.href}
        onClick={(e) => {
          this.handleClick(e).catch((error) => {
            throw error
          })
        }}
      >
        <slot></slot>
      </a>
    )
  }
}
