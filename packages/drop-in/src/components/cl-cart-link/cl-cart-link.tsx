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
import { getCartUrl, isValidUrl } from "@/apis/commercelayer/cart"
import { listenTo } from "@/apis/event"

@Component({
  tag: "cl-cart-link",
  shadow: false,
})
export class ClCartLink {
  @Element() host!: HTMLClCartLinkElement

  /**
   * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
   */
  @Prop({ reflect: true }) target: "_self" | "_blank" | "_parent" | "_top" =
    "_self"

  @State() minicart: HTMLClCartElement | null = null
  @State() href: string | undefined

  connectedCallback(): void {
    this.minicart ??= this.host.querySelector("cl-cart")

    if (this.minicart !== null) {
      this.minicart.type = "mini"
      this.minicart.setOpener(this.host)
      document.body.appendChild(this.minicart)
    }
  }

  // @Watch("href")
  // async watchHrefHandler(newValue: string | undefined): Promise<void> {
  //   console.log("cl-cart-link: href changed to", newValue)
  // }

  disconnectedCallback(): void {
    if (this.minicart !== null) {
      this.host.appendChild(this.minicart)
    }
  }

  componentWillLoad(): void {
    this.host.setAttribute("cl-hydrated", "")

    listenTo("cl-cart-update", async () => {
      if (this.href === undefined || !(await isValidUrl(this.href))) {
        this.href = await getCartUrl()
      }

      if (this.minicart != null) {
        // perche sto ????
        this.host.querySelector('a')?.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
        this.host.querySelector('a')?.click()
      }
    })

    void getCartUrl().then((cartUrl) => {
      this.href = cartUrl
    })
  }

  async handleClick(event: MouseEvent): Promise<void> {
    if (this.href === undefined || !(await isValidUrl(this.href))) {
      event.preventDefault()
      this.href = await getCartUrl(true)
      window.open(this.href, this.target)
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      this.handleOpenMinicart()
    }
  }

  private handleOpenMinicart(): void {
    if (this.minicart !== null) {
      void this.minicart.openMinicart(this.host, this.href)
    }
  }

  render(): JSX.Element {
    if (this.minicart !== null) {
      return (
        <Host aria-disabled={this.href !== undefined ? undefined : "true"}>
          <a
            target={this.target}
            href={this.href}
            onClick={(e) => {
              e.preventDefault()
              this.minicart?.openMinicart(this.host, (e.currentTarget as HTMLAnchorElement).href)
              console.log("cl-cart-link: href changed to", (e.currentTarget as HTMLAnchorElement).href)
            }}
          >
            <slot />
          </a>
        </Host>
        // <Host
        //   role="button"
        //   tabindex="0"
        //   onKeyDown={(event: KeyboardEvent) => {
        //     this.handleKeyDown(event)
        //   }}
        //   onClick={() => {
        //     this.handleOpenMinicart()
        //   }}
        // >
        //   <a
        //   target={this.target}
        //   href={this.href}
        //   onClickCapture={(e) => {
        //     console.log("cl-cart-link: href changed to", (e.currentTarget as HTMLAnchorElement).href)
        //     ;(e.currentTarget as HTMLAnchorElement).href = 'https://google.com'
        //   }}
        //   onClick={(e) => {
        //     e.preventDefault()
        //     this.handleClick(e).catch((error) => {
        //       throw error
        //     })
        //   }}
        // >
        //   <slot />
        // </a>
        // </Host>
      )
    }

    return (
      <Host aria-disabled={this.href !== undefined ? undefined : "true"}>
        <a
          target={this.target}
          href={this.href}
          onClickCapture={(e) => {
            console.log("cl-cart-link: href changed to", (e.currentTarget as HTMLAnchorElement).href)
            ;(e.currentTarget as HTMLAnchorElement).href = 'https://google.com'
          }}
          onClick={(e) => {
            this.handleClick(e).catch((error) => {
              throw error
            })
          }}
        >
          <slot />
        </a>
      </Host>
    )
  }
}
