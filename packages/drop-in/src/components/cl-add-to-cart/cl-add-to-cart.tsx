import { createClient, getConfig } from '#apis/commercelayer'
import { log } from '#utils/logger'
import { Component, Prop, h, Element } from '@stencil/core'

@Component({
  tag: 'cl-add-to-cart',
  styleUrl: 'cl-add-to-cart.css',
  shadow: true,

})
export class CLPrice {
  /**
   * Sku code
   */
  @Prop() sku: string | undefined

  /**
   * Quantity
   */
  @Prop() quantity: number = 1

  @Element()
  host!: HTMLElement

  componentWillLoad() {
    if (typeof this.sku !== 'string') {
      log('warn', '"sku" should be a string.', this.host)
    }

    if (this.quantity < 1) {
      log('warn', '"quantity" should be a number greater than 0.', this.host)
    }
  }

  private async handleClick() {
    const client = await createClient(getConfig())
    console.log(client)
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        <slot></slot>
      </button>
    )
  }
}
