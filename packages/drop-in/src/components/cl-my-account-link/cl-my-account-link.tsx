import { getMyAccountUrl } from '#apis/commercelayer/account'
import { listenTo } from '#apis/event'
import {
  Component,
  Element,
  Host,
  Prop,
  State,
  h,
  type JSX
} from '@stencil/core'

@Component({
  tag: 'cl-my-account-link',
  shadow: false
})
export class ClMyAccountLink {
  @Element() host!: HTMLClMyAccountLinkElement

  /**
   * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
   */
  @Prop({ reflect: true }) target: '_self' | '_blank' | '_parent' | '_top' =
    '_self'

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    listenTo('cl-identity-gettoken', async () => {
      this.href = await getMyAccountUrl()
    })

    this.href = await getMyAccountUrl()
  }

  render(): JSX.Element {
    return (
      <Host aria-disabled={this.href !== undefined ? undefined : 'true'}>
        <a target={this.target} href={this.href}>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
