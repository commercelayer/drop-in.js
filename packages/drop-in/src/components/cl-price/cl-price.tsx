import { getPrice } from '#apis/commercelayer/prices'
import { logCode, isValidCode } from '#utils/validation-helpers'
import type { Price } from '@commercelayer/sdk'
import { Component, Element, h, type JSX, Prop, Watch } from '@stencil/core'
import type { CamelCasedProperties } from 'type-fest'

export interface Props {
  code: string | undefined
}

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice implements CamelCasedProperties<Props> {
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
    if (isValidCode(code)) {
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
