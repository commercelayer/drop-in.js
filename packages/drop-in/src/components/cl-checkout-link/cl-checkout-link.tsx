import { getCheckoutUrl } from '#apis/commercelayer/cart'
import { listenTo } from '#apis/event'
import {
  Component,
  Element,
  h,
  Host,
  type JSX,
  Prop,
  State
} from '@stencil/core'
import type { CamelCasedProperties } from 'type-fest'

export interface Props {
  target: string
}

@Component({
  tag: 'cl-checkout-link',
  shadow: true
})
export class ClCheckoutLink implements CamelCasedProperties<Props> {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) target: string = '_self'

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    listenTo('cl-cart-update', async (event) => {
      if (
        this.href === undefined &&
        event.detail.response.skus_count != null &&
        event.detail.response.skus_count > 0
      ) {
        this.href = await getCheckoutUrl()
      }
    })

    listenTo('cl-cart-hostedcartupdate', (event) => {
      if (
        event.detail.response.skus_count === undefined ||
        event.detail.response.skus_count === 0
      ) {
        this.href = undefined
      }
    })

    this.href = await getCheckoutUrl()
  }

  render(): JSX.Element {
    return (
      <Host aria-disabled={this.href !== undefined ? undefined : 'true'}>
        <a part='a' target={this.target} href={this.href}>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
