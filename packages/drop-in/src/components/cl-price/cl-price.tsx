import { getPrice, Price } from '#apis/commercelayer/prices'
import { logCode, validateCode } from '#utils/validation-helpers'
import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core'

export interface Props {
  code: string | undefined
}

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) code: string | undefined

  async componentWillLoad(): Promise<void> {
    logCode(this.host, this.code)
    await this.updatePrice(this.code)
  }

  @Watch('code')
  async watchPropHandler(newValue: string, _oldValue: string): Promise<void> {
    logCode(this.host, newValue)
    await this.updatePrice(newValue)
  }

  private async updatePrice(code: string | undefined): Promise<void> {
    if (validateCode(code)) {
      const price = await getPrice(code)

      if (price !== undefined) {
        this.host.querySelectorAll('cl-price-amount').forEach((element) => {
          element.dispatchEvent(
            new CustomEvent<Price>('priceUpdate', { detail: price })
          )
        })
      }
    }
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
