import type { Sku } from '@commercelayer/sdk'
import { Component, h, Host, JSX, Listen, Prop, State } from '@stencil/core'

@Component({
  tag: 'cl-availability-status',
  shadow: true
})
export class ClAvailabilityStatus {
  @Prop({ reflect: true }) type: 'available' | 'unavailable' | undefined

  @State() available: boolean | undefined

  @Listen('skuUpdate')
  skuUpdateHandler(event: CustomEvent<Sku>): void {
    // @ts-expect-error
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
