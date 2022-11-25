import {
  getCartUrl,
  triggerHostedCartUpdate,
  updateCartUrl
} from '#apis/commercelayer/cart'
import { getClosestLocationHref } from '#utils/url'
import type { Order } from '@commercelayer/sdk'
import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core'
import { IFrameComponent, iframeResizer } from 'iframe-resizer'

type IframeDataMessage =
  | {
      type: 'updateCart'
    }
  | {
      type: 'close'
    }
  | {
      type: 'blur'
    }

interface IframeData {
  message: IframeDataMessage
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
export class ClCart {
  @Element() host!: HTMLClCartElement

  @Prop({ reflect: true }) type: 'mini' | undefined

  @Prop({ reflect: true, mutable: true }) open: boolean = false
  @State() href: string | undefined

  readonly openDirective: string = 'cl-cart--open'
  private listenForUpdateCartResponse: boolean = true

  iframe!: IFrameComponent

  async componentWillLoad(): Promise<void> {
    await updateCartUrl(this.getCartPageUrl())
    this.href = await getCartUrl()

    if (this.checkLocationHrefForOpenDirective()) {
      this.open = true
    }
  }

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
  watchOpenHandler(newValue: boolean): void {
    if (this.type === 'mini') {
      document.body.classList.toggle(this.openDirective, newValue)

      if (!newValue) {
        this.host.closest('cl-cart-link')?.focus()
      }
    }
  }

  @Listen('cartUpdate', { target: 'window' })
  cartUpdateHandler(_event: CustomEvent<{ order: Order }>): void {
    this.iframe.iFrameResizer.sendMessage({ type: 'updateCart' })
  }

  @Listen('hostedCartUpdate', { target: 'window' })
  hostedCartUpdateHandler(
    event: CustomEvent<{ fromId: string; order: Order }>
  ): void {
    if (this.iframe.id !== event.detail.fromId) {
      this.listenForUpdateCartResponse = false
      this.iframe.iFrameResizer.sendMessage({ type: 'updateCart' })
    }
  }

  componentDidLoad(): void {
    const onMessage = (data: IframeData): void => {
      switch (data.message.type) {
        case 'updateCart':
          if (this.listenForUpdateCartResponse) {
            void triggerHostedCartUpdate(this.iframe.id)
          }

          this.listenForUpdateCartResponse = true
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
        // @ts-expect-error
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
              onClick: (event: MouseEvent) => this.handleCloseMinicart(event)
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
