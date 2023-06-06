import { getIdentityUrl } from '#apis/commercelayer/account'
import { logout } from '#apis/commercelayer/client'
import { isValidUnion, logUnion, unionToTuple } from '#utils/validation-helpers'
import {
  Component,
  Element,
  Host,
  Prop,
  State,
  Watch,
  h,
  type JSX
} from '@stencil/core'

@Component({
  tag: 'cl-identity-link',
  shadow: true
})
export class ClIdentityLink {
  @Element() host!: HTMLElement

  private readonly typeList = unionToTuple<typeof this.type>()(
    'login',
    'sign-up',
    'logout'
  )

  /**
   * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
   */
  @Prop({ reflect: true }) target: '_self' | '_blank' | '_parent' | '_top' =
    '_self'

  /**
   * // TODO: missing description.
   */
  @Prop({ reflect: true }) type!: 'login' | 'sign-up' | 'logout' | undefined

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    await this.updateUrl(this.type)
  }

  @Watch('type')
  async watchTypeHandler(newValue: typeof this.type): Promise<void> {
    await this.updateUrl(newValue)
  }

  private async updateUrl(type: typeof this.type): Promise<void> {
    if (isValidUnion(type, this.typeList)) {
      this.href = await getIdentityUrl(type)
    }

    logUnion(this.host, 'type', type, this.typeList)
  }

  render(): JSX.Element {
    if (!isValidUnion(this.type, this.typeList)) {
      return <Host aria-disabled='true'></Host>
    }

    return (
      <Host aria-disabled={this.href !== undefined ? undefined : 'true'}>
        <a
          part='a'
          target={this.target}
          href={this.href}
          onClick={(event) => {
            if (this.type === 'logout') {
              event.preventDefault()
              void logout()
              location.reload()
            }
          }}
        >
          <slot></slot>
        </a>
      </Host>
    )
  }
}
