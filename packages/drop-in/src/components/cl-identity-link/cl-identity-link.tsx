import { getIdentityUrl } from '#apis/commercelayer/account'
import { logout } from '#apis/commercelayer/client'
import {
  Component,
  Element,
  Host,
  Prop,
  State,
  h,
  type JSX
} from '@stencil/core'
import type { CamelCasedProperties } from 'type-fest'

export interface Props {
  target: string
  type: 'login' | 'sign-up' | 'logout' | undefined
}

@Component({
  tag: 'cl-identity-link',
  shadow: true
})
export class ClIdentityLink implements CamelCasedProperties<Props> {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) target: string = '_self'

  @Prop({ reflect: true }) type: Props['type']

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    if (this.type !== undefined) {
      this.href = await getIdentityUrl(this.type)
    }
  }

  render(): JSX.Element {
    if (this.type == null) {
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
