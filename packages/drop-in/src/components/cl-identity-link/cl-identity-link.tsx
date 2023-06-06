import { getIdentityUrl } from '#apis/commercelayer/account'
import { logout } from '#apis/commercelayer/client'
import { isValidUnion, logUnion } from '#utils/validation-helpers'
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
import type { CamelCasedProperties, TupleToUnion } from 'type-fest'

const typeList = ['login', 'sign-up', 'logout'] as const
export interface Props {
  target: string
  type: TupleToUnion<typeof typeList> | undefined
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
    await this.updateUrl(this.type)
  }

  @Watch('type')
  async watchTypeHandler(newValue: Props['type']): Promise<void> {
    await this.updateUrl(newValue)
  }

  private async updateUrl(type: Props['type']): Promise<void> {
    if (isValidUnion(type, typeList)) {
      this.href = await getIdentityUrl(type)
    }

    logType(this.host, type)
  }

  render(): JSX.Element {
    if (!isValidUnion(this.type, typeList)) {
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

function logType(host: HTMLElement, type: Props['type']): void {
  logUnion(host, 'type', type, typeList)
}
