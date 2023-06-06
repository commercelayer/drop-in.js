import type { Sku } from '#apis/types'
import { logUnion } from '#utils/validation-helpers'
import {
  Component,
  Host,
  Listen,
  Prop,
  State,
  h,
  type JSX,
  Element,
  Watch
} from '@stencil/core'

@Component({
  tag: 'cl-availability-status',
  shadow: true
})
export class ClAvailabilityStatus {
  @Element() host!: HTMLElement

  private readonly typeList: Array<NonNullable<typeof this.type>> = [
    'available',
    'unavailable'
  ]

  /**
   * The product availability status.
   * It determines the visibility of the inner message.
   */
  @Prop({ reflect: true }) type!: 'available' | 'unavailable' | undefined

  @State() available: boolean | undefined

  @Listen('availabilityUpdate')
  availabilityUpdateHandler(event: CustomEvent<Sku>): void {
    this.available = event.detail.inventory?.available
  }

  async componentWillLoad(): Promise<void> {
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
      (this.type === 'available' && this.available === true) ||
      (this.type === 'unavailable' && this.available === false)
    ) {
      return <slot></slot>
    }

    return <Host aria-disabled='true'></Host>
  }
}
