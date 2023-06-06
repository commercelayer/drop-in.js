import {
  getCartUrl,
  isValidUrl,
  triggerHostedCartUpdate,
  updateCartUrl
} from '#apis/commercelayer/cart'
import { listenTo } from '#apis/event'
import { getClosestLocationHref } from '#utils/url'
import { type Order } from '@commercelayer/sdk'
import {
  Component,
  Element,
  Host,
  Listen,
  Prop,
  State,
  Watch,
  h,
  type JSX
} from '@stencil/core'
import { iframeResizer, type IFrameComponent } from 'iframe-resizer'

interface IframeData {
  message:
    | {
        type: 'update'
        payload?: Order
      }
    | {
        type: 'close'
      }
    | {
        type: 'blur'
      }
}

const hostedCartIframeUpdateEvent = { type: 'update' } as const

@Component({
  tag: 'cl-cart',
  styles: `
    :host([type="mini"]) {
      display: none;
    }

    :host([type="mini"]) > div {
      background: var(--cl-cart-mini-modal-bg);
    }

    :host > div {
      overflow: auto;
      width: 100%;
      display: flex;
    }
  `,
  shadow: true
})
export class ClCart {
  @Element() host!: HTMLClCartElement

  private iframe!: IFrameComponent

  /**
   * By default the `cl-cart` is directly displayed in-place.
   * Setting the `type` to `mini` will change the behavior to be a minicart.
   */
  @Prop({ reflect: true }) type: 'mini' | undefined

  /**
   * Toggle this switch to make the minicart automatically open as soon as an item is added to the shopping cart
   * (available _only_ when the `cl-cart` component is used as _minicart_).
   */
  @Prop({ reflect: true }) openOnAdd: boolean = false

  /**
   * Indicate whether the minicart is open or not
   * (available _only_ when the `cl-cart` component is used as _minicart_).
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false

  /** Current hosted cart url */
  @State() href: string | undefined

  @State() isMinicart: boolean = false

  /**
   * Used for:
   * 1. As query parameter that re-open the minicart when clicking on `< Return to cart` (Hosted Cart link).
   * 2. As body class when the minicart is open to disable page scrolling.
   */
  readonly openDirective = 'cl-cart--open' as const

  private flag_listenForHostedCartUpdateResponse: boolean = true
  private flag_justAddedToCart: boolean = false

  async componentWillLoad(): Promise<void> {
    listenTo('cl-cart-hostedcartupdate', (event) => {
      const [iframeId] = event.detail.request.args
      if (this.iframe.id !== iframeId) {
        this.flag_listenForHostedCartUpdateResponse = false
        this.iframe.iFrameResizer.sendMessage(hostedCartIframeUpdateEvent)
      }
    })

    listenTo('cl-cart-update', async () => {
      this.flag_justAddedToCart = true
      this.iframe.iFrameResizer.sendMessage(hostedCartIframeUpdateEvent)

      await this.updateUrl(this.openOnAdd)
    })

    await updateCartUrl(this.getCartPageUrl())

    if (this.checkLocationHrefForOpenDirective()) {
      this.open = true
    }

    this.updateMinicartUrl()
  }

  private async updateUrl(bypassMinicartCheck?: boolean): Promise<void> {
    const shouldUpdate =
      this.href === undefined || !(await isValidUrl(this.href))

    if (
      ((this.type === 'mini' && this.open) ||
        this.type !== 'mini' ||
        bypassMinicartCheck === true) &&
      shouldUpdate
    ) {
      this.href = await getCartUrl()
    }
  }

  /**
   * Get the current page url.
   * When the component is rendered as `minicart` the cart page url will be the current page url, plus a dedicated query parameter.
   * @returns Current page url ( + query parameter when rendered as `minicart` )
   */
  getCartPageUrl(): string {
    const closestLocationHref = getClosestLocationHref()

    if (this.type === 'mini') {
      const url = new URL(closestLocationHref)
      if (!url.searchParams.has(this.openDirective)) {
        url.searchParams.append(this.openDirective, '')
      }

      return url.href
    }

    return closestLocationHref
  }

  /**
   * Check whether the current url has the `openDirective` query parameter.
   * @returns Whether the current url has the `openDirective`
   */
  private checkLocationHrefForOpenDirective(): boolean {
    const url = new URL(location.href)

    if (this.type === 'mini' && url.searchParams.has(this.openDirective)) {
      url.searchParams.delete(this.openDirective)
      history.replaceState({}, '', url.href)
      return true
    }

    return false
  }

  private updateMinicartUrl(): void {
    void this.updateUrl()
    if (this.type === 'mini') {
      document.body.classList.toggle(this.openDirective, this.open)
    }
  }

  @Watch('open')
  watchOpenHandler(opened: boolean): void {
    if (this.type === 'mini') {
      this.updateMinicartUrl()

      if (!opened) {
        this.host.closest('cl-cart-link')?.focus()
      }
    }
  }

  componentDidLoad(): void {
    const onMessage = (data: IframeData): void => {
      switch (data.message.type) {
        case 'update':
          if (this.flag_listenForHostedCartUpdateResponse) {
            void triggerHostedCartUpdate(
              this.iframe.id,
              data.message.payload ?? null
            )
          }

          if (
            this.type === 'mini' &&
            this.openOnAdd &&
            this.flag_justAddedToCart
          ) {
            this.open = true
          }

          this.flag_justAddedToCart = false
          this.flag_listenForHostedCartUpdateResponse = true
          break

        case 'close':
          if (this.type === 'mini') {
            this.open = false
          }
          break

        case 'blur':
          if (this.type === 'mini' && this.open) {
            this.iframe.focus()
          }
          break
      }
    }

    iframeResizer(
      {
        checkOrigin: false,

        bodyPadding: '20px',

        // 'messageCallback' has been renamed 'onMessage'. The old method will be removed in the next major version.
        // @ts-expect-error We are using the latest version for 'iframe-resized' but unfortunately types are not updated.
        onMessage
      },
      this.iframe
    )
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent): void {
    if (this.type === 'mini' && event.key === 'Escape' && this.open) {
      this.handleCloseMinicart(event)
    }
  }

  private handleCloseMinicart(event: Event): void {
    event.stopPropagation()
    this.open = false
  }

  render(): JSX.Element {
    return (
      <Host
        {...(this.type === 'mini'
          ? {
              role: this.open ? 'alertdialog' : undefined,
              'aria-modal': this.open ? 'true' : undefined,
              'aria-hidden': !this.open ? 'true' : undefined,
              tabindex: !this.open ? '-1' : undefined,
              onClick: (event: MouseEvent) => {
                this.handleCloseMinicart(event)
              }
            }
          : {})}
      >
        <div>
          <iframe
            part='iframe'
            title='My Cart'
            ref={(el) => (this.iframe = el as IFrameComponent)}
            src={this.href}
            style={{
              width: '1px',
              'min-width': '100%',
              'min-height': '100%',
              border: 'none'
            }}
          ></iframe>
        </div>
      </Host>
    )
  }
}
