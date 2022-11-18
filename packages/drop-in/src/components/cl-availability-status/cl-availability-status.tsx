import type { Sku } from '#apis/commercelayer/skus'
import { Component, h, Host, JSX, Listen, Prop, State } from '@stencil/core'

export interface Props {
  type: 'available' | 'unavailable' | undefined
}

@Component({
  tag: 'cl-availability-status',
  shadow: true
})
export class ClAvailabilityStatus implements Props {
  @Prop({ reflect: true }) type: 'available' | 'unavailable' | undefined

  @State() available: boolean | undefined

  @Listen('availabilityUpdate')
  availabilityUpdateHandler(event: CustomEvent<Sku>): void {
    this.available = event.detail.inventory?.available
  }

  render(): JSX.Element | null {
    if (
      (this.type === 'available' && this.available === true) ||
      (this.type === 'unavailable' && this.available === false)
    ) {
      return <slot></slot>
    }

    return <Host aria-disabled='true'></Host>
  }
}
