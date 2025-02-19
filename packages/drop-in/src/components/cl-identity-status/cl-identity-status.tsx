import { getAccessToken } from '#apis/commercelayer/client'
import { getConfig } from '#apis/commercelayer/config'
import { listenTo } from '#apis/event'
import { isValidUnion, logUnion, unionToTuple } from '#utils/validation-helpers'
import {
  Component,
  Element,
  Host,
  Prop,
  State,
  h,
  type JSX,
  Watch
} from '@stencil/core'

@Component({
  tag: 'cl-identity-status',
  shadow: true
})
export class ClIdentityStatus {
  @Element() host!: HTMLClIdentityStatusElement

  private readonly typeList = unionToTuple<typeof this.type>()(
    'guest',
    'customer'
  )

  /**
   * The user identity status (logged in or not logged in).
   * It determines the visibility of the inner message based on the stored token.
   */
  @Prop({ reflect: true }) type!: 'guest' | 'customer' | undefined

  @State() status: typeof this.type

  async componentWillLoad(): Promise<void> {
    listenTo('cl-identity-gettoken', (event) => {
      this.status = event.detail.response.type
    })

    const config = getConfig()
    this.status = (await getAccessToken(config)).type

    this.logType(this.type)
  }

  @Watch('type')
  async watchTypeHandler(newValue: typeof this.type): Promise<void> {
    this.logType(newValue)
  }

  private logType(type: typeof this.type): void {
    logUnion(this.host, 'type', type, this.typeList)
  }

  render(): JSX.Element {
    if (
      isValidUnion(this.type, this.typeList) &&
      isValidUnion(this.status, this.typeList) &&
      this.type === this.status
    ) {
      return <slot></slot>
    }

    return <Host aria-disabled='true'></Host>
  }
}
