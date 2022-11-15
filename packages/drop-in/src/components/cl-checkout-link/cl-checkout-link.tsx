import { getCheckoutUrl } from '#apis/commercelayer/cart'
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
  tag: 'cl-checkout-link',
  shadow: true
})
export class ClCheckoutLink {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) target: string = '_self'

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    this.href = await getCheckoutUrl()
  }

  @Listen('cartUpdate', { target: 'window' })
  async cartUpdateHandler(_event: CustomEvent<Order>): Promise<void> {
    this.href = await getCheckoutUrl()
  }

  render(): JSX.Element {
    return (
      <Host aria-disabled={this.href !== undefined ? undefined : 'true'}>
        <a
          part='link'
          target={this.target}
          href={this.href}
          aria-disabled={this.href !== undefined ? undefined : 'true'}
        >
          <slot></slot>
        </a>
      </Host>
    )
  }
}
