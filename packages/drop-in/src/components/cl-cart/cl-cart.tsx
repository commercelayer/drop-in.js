import { getCartUrl, triggerCartUpdate } from '#apis/commercelayer/cart'
import { Component, Host, h, JSX, Element, State } from '@stencil/core'
import { iframeResizer } from 'iframe-resizer'

@Component({
  tag: 'cl-cart',
  shadow: true
})
export class ClCart {
  @Element() host!: HTMLElement

  @State() href: string | undefined

  iframe!: HTMLIFrameElement

  async componentWillLoad(): Promise<void> {
    this.href = await getCartUrl()
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
      <Host>
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
