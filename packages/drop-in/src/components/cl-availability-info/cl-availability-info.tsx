import type { Sku } from '#apis/commercelayer/skus'
import { Component, h, Host, JSX, Listen, Prop, State } from '@stencil/core'

export type Type =
  | 'min-days'
  | 'max-days'
  | 'min-hours'
  | 'max-hours'
  | 'shipping-method-name'
  | 'shipping-method-price'
  | undefined

export interface Props {
  type: Type
}

@Component({
  tag: 'cl-availability-info',
  shadow: true
})
export class ClAvailabilityInfo implements Props {
  @Prop({ reflect: true }) type: Type

  @State() text: string | undefined

  @Listen('availabilityUpdate')
  availabilityUpdateHandler(event: CustomEvent<Sku>): void {
    if (this.type === undefined) {
      return
    }

    const deliveryLeadTime =
      event.detail.inventory?.levels[0]?.delivery_lead_times[0]

    switch (this.type) {
      case 'min-days':
        this.text = deliveryLeadTime?.min.days.toFixed(0)
        break
      case 'min-hours':
        this.text = deliveryLeadTime?.min.hours.toFixed(0)
        break
      case 'max-days':
        this.text = deliveryLeadTime?.max.days.toFixed(0)
        break
      case 'max-hours':
        this.text = deliveryLeadTime?.max.hours.toFixed(0)
        break
      case 'shipping-method-name':
        this.text = deliveryLeadTime?.shipping_method.name
        break
      case 'shipping-method-price':
        this.text = deliveryLeadTime?.shipping_method.formatted_price_amount
        break
    }
  }

  render(): JSX.Element {
    return <Host>{this.text}</Host>
  }
}
