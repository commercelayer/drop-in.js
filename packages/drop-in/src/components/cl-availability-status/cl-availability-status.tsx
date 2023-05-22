import type { Sku } from '#apis/types'
import {
  Component,
  h,
  Host,
  type JSX,
  Listen,
  Prop,
  State
} from '@stencil/core'
import type { CamelCasedProperties } from 'type-fest'

export interface Props {
  type: 'available' | 'unavailable' | undefined
}

@Component({
  tag: 'cl-availability-status',
  shadow: true
})
export class ClAvailabilityStatus implements CamelCasedProperties<Props> {
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
