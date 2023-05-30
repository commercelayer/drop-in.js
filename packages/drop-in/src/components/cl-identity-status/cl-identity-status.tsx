import { getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import { listenTo } from '#apis/event'
import { Component, Host, Prop, State, h, type JSX } from '@stencil/core'
import type { CamelCasedProperties } from 'type-fest'

export interface Props {
  type: 'guest' | 'customer' | undefined
}

@Component({
  tag: 'cl-identity-status',
  shadow: true
})
export class ClIdentityStatus implements CamelCasedProperties<Props> {
  @Prop({ reflect: true }) type: Props['type']

  @State() status: Props['type']

  async componentWillLoad(): Promise<void> {
    listenTo('cl-identity-token', (event) => {
      this.status = event.detail.response.type
    })

    const config = getConfig()
    this.status = (await getAccessToken(config)).type
  }

  render(): JSX.Element {
    if (
      this.type !== undefined &&
      this.status !== undefined &&
      this.type === this.status
    ) {
      return <slot></slot>
    }

    return <Host aria-disabled='true'></Host>
  }
}
