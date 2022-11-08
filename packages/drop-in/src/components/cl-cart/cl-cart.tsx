import { getCartUrl, triggerCartUpdate } from '#apis/commercelayer/cart'
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
import { iframeResizer } from 'iframe-resizer'

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

  iframe!: HTMLIFrameElement

  async componentWillLoad(): Promise<void> {
    this.href = await getCartUrl()
  }

  @Watch('open')
  watchOpenHandler(newValue: boolean): void {
    if (this.type === 'mini') {
      document.body.classList.toggle('cl-cart--open', newValue)

      if (!newValue) {
        this.host.closest('cl-cart-link')?.focus()
      }
    }
  }

  @Listen('cartUpdate', { target: 'window' })
  cartUpdateHandler(): void {
    // eslint-disable-next-line no-self-assign
    // this.iframe.src = this.iframe.src
  }

  componentDidLoad(): void {
    const onMessage = (data: IframeData): void => {
      switch (data.message.type) {
        case 'updateCart':
          void triggerCartUpdate(null)
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
              // tabindex: this.open ? 0 : undefined,
              role: this.open ? 'alertdialog' : undefined,
              'aria-modal': this.open ? 'true' : undefined,
              'aria-hidden': !this.open ? 'true' : undefined,
              onClick: (event: MouseEvent) => this.handleCloseMinicart(event)
            }
          : {})}
      >
        <div>
          <iframe
            part='iframe'
            title='My Cart'
            ref={(el) => (this.iframe = el as HTMLIFrameElement)}
            src={this.href}
            style={{
              width: '1px',
              'min-width': '100%',
              'min-height': '100%',
              border: 'none'
            }}
            {...(this.type === 'mini'
              ? {
                  tabindex: !this.open ? '-1' : undefined,
                  onKeyDown: (event: KeyboardEvent) => this.handleKeyDown(event)
                }
              : {})}
          ></iframe>
        </div>
      </Host>
    )
  }
}
