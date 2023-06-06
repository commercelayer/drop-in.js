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

export interface Props {
  target: string
}

@Component({
  tag: 'cl-my-account-link',
  shadow: true
})
export class ClMyAccountLink implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) target: string = '_self'

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
        <a part='a' target={this.target} href={this.href}>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
