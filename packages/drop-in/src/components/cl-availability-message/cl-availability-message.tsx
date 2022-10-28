import type { Sku } from '#apis/commercelayer/skus'
import { Component, h, Host, JSX, Listen, Prop, State } from '@stencil/core'

@Component({
  tag: 'cl-availability-message',
  shadow: true
})
export class ClAvailabilityMessage {
  @Prop({ reflect: true }) format: 'days' | 'hours' | undefined
  @Prop({ reflect: true }) message: string | undefined

  @State() displayMessage: string | undefined

  @Listen('skuUpdate')
  skuUpdateHandler(event: CustomEvent<Sku>): void {
    if (this.format === undefined || this.message === undefined) {
      return
    }

    const deliveryLeadTime =
      event.detail.inventory?.levels[0]?.delivery_lead_times[0]

    if (deliveryLeadTime === undefined) {
      return
    }

    const min = deliveryLeadTime.min[this.format]
    const max = deliveryLeadTime.max[this.format]

    if (min !== undefined && max !== undefined) {
      this.displayMessage = this.message
        .replace(/\{min\}/g, min.toFixed(0))
        .replace(/\{max\}/g, max.toFixed(0))
    }
  }

  render(): JSX.Element {
    return <Host>{this.displayMessage}</Host>
  }
}
