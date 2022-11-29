import {
  getCheckoutUrl,
  TriggerCartUpdateEvent
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
    _event: CustomEvent<TriggerCartUpdateEvent>
  ): Promise<void> {
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
