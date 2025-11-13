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
import { getMyAccountUrl } from "@/apis/commercelayer/account"
import { listenTo } from "@/apis/event"
import { getClosestLocationHref } from "@/utils/url"

@Component({
  tag: "cl-my-account-link",
  shadow: false,
})
export class ClMyAccountLink {
  @Element() host!: HTMLClMyAccountLinkElement

  /**
   * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
   */
  @Prop({ reflect: true }) target: "_self" | "_blank" | "_parent" | "_top" =
    "_self"

  /**
   * Providing this attribute will enable the "Back to shop" and "Logout" navigation links on the My Account page.
   * When set to `true`, the link will redirect to the current page URL.
   * You can also provide a custom URL string.
   */
  @Prop({ reflect: true, mutable: true }) backToShop?: "true" | string

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    listenTo("cl-identity-gettoken", async () => {
      if (isTrue(this.backToShop)) {
        this.backToShop = getClosestLocationHref()
      }

      this.href = await getMyAccountUrl({ returnUrl: this.backToShop })
    })

    if (isTrue(this.backToShop)) {
      this.backToShop = getClosestLocationHref()
    }

    this.href = await getMyAccountUrl({ returnUrl: this.backToShop })
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

function isTrue(value: unknown): value is true {
  return value === true || value === "true"
}
