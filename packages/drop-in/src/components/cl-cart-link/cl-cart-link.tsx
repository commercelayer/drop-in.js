import { getCartUrl, isValidUrl } from '#apis/commercelayer/cart'
import { listenTo } from '#apis/event'
import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core'

export interface Props {
  target: string
}

@Component({
  tag: 'cl-cart-link',
  shadow: true
})
export class CLCartLink implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) target: string = '_self'

  @State() minicart: HTMLClCartElement | null = null
  @State() href: string | undefined

  componentWillLoad(): void {
    this.host.setAttribute('cl-hydrated', '')
    this.minicart = this.host.querySelector('cl-cart')

    if (this.minicart !== null) {
      this.minicart.type = 'mini'
    }

    listenTo('cl.cart.update', async () => {
      if (this.href === undefined || !isValidUrl(this.href)) {
        this.href = await getCartUrl()
      }
    })

    void getCartUrl().then((cartUrl) => {
      this.href = cartUrl
    })
  }

  async handleClick(event: MouseEvent): Promise<void> {
    if (this.href === undefined || !isValidUrl(this.href)) {
      event.preventDefault()
      this.href = await getCartUrl(true)
      window.open(this.href, this.target)
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleOpenMinicart()
    }
  }

  private handleOpenMinicart(): void {
    if (this.minicart !== null) {
      this.minicart.open = true
    }
  }

  render(): JSX.Element {
    if (this.minicart !== null) {
      return (
        <Host
          role='button'
          tabindex='0'
          onKeyDown={(event: KeyboardEvent) => this.handleKeyDown(event)}
          onClick={() => this.handleOpenMinicart()}
        >
          <slot></slot>
        </Host>
      )
    }

    return (
      <Host aria-disabled={this.href !== undefined ? undefined : 'true'}>
        <a
          part='a'
          target={this.target}
          href={this.href}
          onClick={(e) => {
            this.handleClick(e).catch((error) => {
              throw error
            })
          }}
        >
          <slot></slot>
        </a>
      </Host>
    )
  }
}
