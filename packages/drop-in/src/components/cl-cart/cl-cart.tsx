import {
  getCartUrl,
  isValidUrl,
  triggerHostedCartUpdate,
  updateCartUrl
} from '#apis/commercelayer/cart'
import { listenTo } from '#apis/event'
import { getClosestLocationHref } from '#utils/url'
import {
  Component,
  Element,
  h,
  Host,
  type JSX,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core'
import { type IFrameComponent, iframeResizer } from 'iframe-resizer'
import type { CamelCasedProperties } from 'type-fest'

interface IframeData {
  message:
    | {
        type: 'update'
      }
    | {
        type: 'close'
      }
    | {
        type: 'blur'
      }
}

const hostedCartIframeUpdateEvent = { type: 'update' } as const

export interface Props {
  type: 'mini' | undefined
  'open-on-add': boolean
  open: boolean
}

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
export class ClCart implements CamelCasedProperties<Props> {
  @Element() host!: HTMLClCartElement

  private iframe!: IFrameComponent

  /**
   * By default the `cl-cart` is directly displayed in-place.
   * Setting the `type` to `mini` will change the behavior to be a minicart.
   */
  @Prop({ reflect: true }) type: 'mini' | undefined

  /**
   * Automatically open the minicart as soon as an item is added to the cart.
   * @info only available when `cl-cart` is used as minicart (`type="mini"`).
   */
  @Prop({ reflect: true }) openOnAdd: boolean = false

  /**
   * Indicate whether the minicart is open or not.
   * @info only available when `cl-cart` is used as minicart (`type="mini"`).
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false

  /** Current hosted cart url */
  @State() href: string | undefined

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

      if (this.href === undefined || !isValidUrl(this.href)) {
        this.href = await getCartUrl()
      }
    })

    await updateCartUrl(this.getCartPageUrl())
    this.href = await getCartUrl()

    if (this.checkLocationHrefForOpenDirective()) {
      this.open = true
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
  checkLocationHrefForOpenDirective(): boolean {
    const url = new URL(location.href)

    if (this.type === 'mini' && url.searchParams.has(this.openDirective)) {
      url.searchParams.delete(this.openDirective)
      history.replaceState({}, '', url.href)
      return true
    }

    return false
  }

  @Watch('open')
  watchOpenHandler(opened: boolean): void {
    if (this.type === 'mini') {
      document.body.classList.toggle(this.openDirective, opened)

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
            void triggerHostedCartUpdate(this.iframe.id)
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
