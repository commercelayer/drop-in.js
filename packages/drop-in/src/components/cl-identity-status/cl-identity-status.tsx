import { getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import { listenTo } from '#apis/event'
import { isValidUnion, logUnion } from '#utils/validation-helpers'
import {
  Component,
  Element,
  Host,
  Prop,
  State,
  h,
  type JSX
} from '@stencil/core'
import type { CamelCasedProperties, TupleToUnion } from 'type-fest'

const typeList = ['guest', 'customer'] as const
export interface Props {
  type: TupleToUnion<typeof typeList> | undefined
}

@Component({
  tag: 'cl-identity-status',
  shadow: true
})
export class ClIdentityStatus implements CamelCasedProperties<Props> {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) type: Props['type']

  @State() status: Props['type']

  async componentWillLoad(): Promise<void> {
    listenTo('cl-identity-gettoken', (event) => {
      this.status = event.detail.response.type
    })

    const config = getConfig()
    this.status = (await getAccessToken(config)).type

    logType(this.host, this.type)
  }

  render(): JSX.Element {
    if (
      isValidUnion(this.type, typeList) &&
      isValidUnion(this.status, typeList) &&
      this.type === this.status
    ) {
      return <slot></slot>
    }

    return <Host aria-disabled='true'></Host>
  }
}

function logType(host: HTMLElement, type: Props['type']): void {
  logUnion(host, 'type', type, typeList)
}
