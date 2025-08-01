import {
  Component,
  Element,
  Host,
  // biome-ignore lint/correctness/noUnusedImports: "h" is used in the render method
  h,
  type JSX,
  Prop,
  State,
} from "@stencil/core"
import { getCheckoutUrl } from "#apis/commercelayer/cart"
import { listenTo } from "#apis/event"

@Component({
  tag: "cl-checkout-link",
  shadow: false,
})
export class ClCheckoutLink {
  @Element() host!: HTMLClCheckoutLinkElement

  /**
   * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
   */
  @Prop({ reflect: true }) target: "_self" | "_blank" | "_parent" | "_top" =
    "_self"

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    listenTo("cl-cart-update", async (event) => {
      if (
        this.href === undefined &&
        event.detail.response.skus_count != null &&
        event.detail.response.skus_count > 0
      ) {
        this.href = await getCheckoutUrl()
      }
    })

    listenTo("cl-cart-hostedcartupdate", (event) => {
      if (
        event.detail.response.skus_count === undefined ||
        event.detail.response.skus_count === 0
      ) {
        this.href = undefined
      }
    })

    this.href = await getCheckoutUrl()
  }

  render(): JSX.Element {
    return (
      <Host aria-disabled={this.href !== undefined ? undefined : "true"}>
        <a target={this.target} href={this.href}>
          <slot />
        </a>
      </Host>
    )
  }
}
