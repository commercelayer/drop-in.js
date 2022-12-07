import {
  getCheckoutUrl,
  TriggerCartUpdateEvent,
  TriggerHostedCartUpdateEvent
} from '#apis/commercelayer/cart'
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

export interface Props {
  target: string
}

@Component({
  tag: 'cl-checkout-link',
  shadow: true
})
export class ClCheckoutLink implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) target: string = '_self'

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    this.href = await getCheckoutUrl()
  }

  @Listen('cartUpdate', { target: 'window' })
  async cartUpdateHandler(
    event: CustomEvent<TriggerCartUpdateEvent>
  ): Promise<void> {
    if (
      this.href === undefined &&
      event.detail.order.skus_count !== undefined &&
      event.detail.order.skus_count > 0
    ) {
      this.href = await getCheckoutUrl()
    }
  }

  @Listen('hostedCartUpdate', { target: 'window' })
  async hostedCartUpdateHandler(
    event: CustomEvent<TriggerHostedCartUpdateEvent>
  ): Promise<void> {
    if (
      event.detail.order.skus_count === undefined ||
      event.detail.order.skus_count === 0
    ) {
      this.href = undefined
    }
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
