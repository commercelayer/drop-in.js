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

@Component({
  tag: 'cl-cart',
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
    document.body.style.overflow = newValue ? 'hidden' : ''
  }

  @Listen('cartUpdate', { target: 'window' })
  cartUpdateHandler(): void {
    // eslint-disable-next-line no-self-assign
    // this.iframe.src = this.iframe.src
  }

  componentDidLoad(): void {
    iframeResizer(
      {
        checkOrigin: false,

        // 'messageCallback' has been renamed 'onMessage'. The old method will be removed in the next major version.
        // @ts-expect-error
        onMessage(data) {
          if (data.message.type === 'updateCart') {
            triggerCartUpdate(null).catch((error) => {
              throw error
            })
          }
        }
      },
      this.iframe
    )
  }

  render(): JSX.Element {
    return (
      <Host
        aria-hidden={this.type === 'mini' && !this.open ? 'true' : undefined}
        onClick={(event: MouseEvent) => {
          event.stopPropagation()
          this.open = false
        }}
      >
        <iframe
          ref={(el) => (this.iframe = el as HTMLIFrameElement)}
          src={this.href}
          frameBorder={0}
          style={{
            width: '1px',
            'min-width': '100%',
            'min-height': '100%',
            overflow: 'hidden'
          }}
          scrolling='no'
        ></iframe>
      </Host>
    )
  }
}
