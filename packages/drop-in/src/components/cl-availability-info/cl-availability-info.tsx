import {
  Component,
  Element,
  Host,
  // biome-ignore lint/correctness/noUnusedImports: "h" is used in the render method
  h,
  type JSX,
  Listen,
  Prop,
  State,
  Watch,
} from "@stencil/core"
import { minBy } from "lodash-es"
import type { AvailabilityUpdateEventPayload } from "@/apis/types"
import { logUnion, unionToTuple } from "@/utils/validation-helpers"

@Component({
  tag: "cl-availability-info",
  shadow: true,
})
export class ClAvailabilityInfo {
  @Element() host!: HTMLClAvailabilityInfoElement

  private readonly typeList = unionToTuple<typeof this.type>()(
    "min-days",
    "max-days",
    "min-hours",
    "max-hours",
    "shipping-method-name",
    "shipping-method-price",
  )

  /**
   * The type of information to be displayed.
   */
  @Prop({ reflect: true }) type!:
    | "min-days"
    | "max-days"
    | "min-hours"
    | "max-hours"
    | "shipping-method-name"
    | "shipping-method-price"
    | undefined

  /**
   * Displayed text.
   */
  @State() text: string | undefined

  @Listen("availabilityUpdate")
  availabilityUpdateHandler(
    event: CustomEvent<AvailabilityUpdateEventPayload>,
  ): void {
    if (this.type === undefined) {
      return
    }

    const deliveryLeadTimes =
      event.detail?.sku?.inventory?.levels?.[0]?.delivery_lead_times

    const deliveryLeadTime =
      event.detail.rule === "cheapest"
        ? deliveryLeadTimes?.[0]
        : minBy(deliveryLeadTimes, (o) => (o.min.hours + o.max.hours) / 2)

    switch (this.type) {
      case "min-days":
        this.text = deliveryLeadTime?.min.days.toFixed(0)
        break
      case "min-hours":
        this.text = deliveryLeadTime?.min.hours.toFixed(0)
        break
      case "max-days":
        this.text = deliveryLeadTime?.max.days.toFixed(0)
        break
      case "max-hours":
        this.text = deliveryLeadTime?.max.hours.toFixed(0)
        break
      case "shipping-method-name":
        this.text = deliveryLeadTime?.shipping_method.name
        break
      case "shipping-method-price":
        this.text = deliveryLeadTime?.shipping_method.formatted_price_amount
        break
    }
  }

  async componentWillLoad(): Promise<void> {
    this.logType(this.type)
  }

  @Watch("type")
  async watchTypeHandler(newValue: typeof this.type): Promise<void> {
    this.logType(newValue)
  }

  private logType(type: typeof this.type): void {
    logUnion(this.host, "type", type, this.typeList)
  }

  render(): JSX.Element {
    return <Host>{this.text}</Host>
  }
}
