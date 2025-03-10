import {
  Component,
  Element,
  Host,
  type JSX,
  Listen,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core"
import type { AvailabilityUpdateEventPayload } from "#apis/types"
import { logUnion } from "#utils/validation-helpers"

@Component({
  tag: "cl-availability-status",
  shadow: true,
})
export class ClAvailabilityStatus {
  @Element() host!: HTMLClAvailabilityStatusElement

  private readonly typeList: Array<NonNullable<typeof this.type>> = [
    "available",
    "available-with-info",
    "unavailable",
  ]

  /**
   * The product availability status.
   * It determines the visibility of the inner message.
   */
  @Prop({ reflect: true }) type!:
    | "available"
    | "available-with-info"
    | "unavailable"
    | undefined

  @State() available: boolean | undefined

  @State() hasDeliveryLeadTimes: boolean | undefined

  @Listen("availabilityUpdate")
  availabilityUpdateHandler(
    event: CustomEvent<AvailabilityUpdateEventPayload>,
  ): void {
    const hasQuantity =
      event.detail?.sku?.inventory?.quantity === undefined ||
      event.detail.sku.inventory.quantity - event.detail.cartQuantity > 0

    this.available =
      event.detail?.sku?.inventory?.available == null
        ? undefined
        : event.detail.sku.inventory.available && hasQuantity

    this.hasDeliveryLeadTimes =
      (event.detail?.sku?.inventory?.levels?.[0]?.delivery_lead_times?.length ??
        0) > 0
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
    if (
      (this.type === "available" && this.available === true) ||
      (this.type === "unavailable" && this.available === false) ||
      (this.type === "available-with-info" &&
        this.available === true &&
        this.hasDeliveryLeadTimes === true)
    ) {
      return <slot></slot>
    }

    return <Host aria-disabled="true"></Host>
  }
}
