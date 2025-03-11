import type { Price } from "@commercelayer/sdk"
import {
  Component,
  Host,
  type JSX,
  Listen,
  Prop,
  State,
  h,
} from "@stencil/core"

@Component({
  tag: "cl-price-amount",
  shadow: true,
})
export class ClPriceAmount {
  /**
   * The type of price amount to be displayed.
   */
  @Prop({ reflect: true }) type: "price" | "compare-at" = "price"

  @State() price: Price | undefined

  @Listen("priceUpdate")
  priceUpdateHandler(event: CustomEvent<Price | undefined>): void {
    this.price = event.detail
  }

  render(): JSX.Element {
    const hasStrikethrough: boolean =
      this.price?.formatted_compare_at_amount !== this.price?.formatted_amount

    return (
      <Host>
        {this.type === "compare-at"
          ? hasStrikethrough && (
              <s part="strikethrough">
                {this.price?.formatted_compare_at_amount}
              </s>
            )
          : this.price?.formatted_amount}
      </Host>
    )
  }
}
