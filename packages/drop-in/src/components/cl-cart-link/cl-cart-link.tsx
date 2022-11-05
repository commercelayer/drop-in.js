import { getCartUrl, isValidUrl } from '#apis/commercelayer/cart'
import type { Order } from '@commercelayer/sdk'
import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State
} from '@stencil/core'

@Component({
  tag: 'cl-cart-link',
  shadow: true
})
export class CLCartLink {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) target: string = '_self'

  @State() cart: HTMLClCartElement | null = null
  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    this.href = await getCartUrl()
    this.cart = this.host.querySelector('cl-cart')
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
    if (this.cart !== null) {
      return (
        <Host
          onClick={() => {
            if (this.cart !== null) {
              this.cart.open = true
            }
          }}
        >
          <slot></slot>
        </Host>
      )
    }

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
