import type { Sku } from '#apis/types'
import {
  Component,
  Host,
  Listen,
  Prop,
  State,
  h,
  type JSX
} from '@stencil/core'

@Component({
  tag: 'cl-availability-status',
  shadow: true
})
export class ClAvailabilityStatus {
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
