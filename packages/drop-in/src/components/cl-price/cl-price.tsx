import { getPrice as getBundlePrice } from '#apis/commercelayer/bundles'
import { getPrice as getSkuPrice } from '#apis/commercelayer/prices'
import {
  isValidCode,
  logCode,
  logUnion,
  unionToTuple
} from '#utils/validation-helpers'
import type { Price } from '@commercelayer/sdk'
import { Component, Element, Prop, Watch, h, type JSX } from '@stencil/core'

export interface Props {
  code: string | undefined
}

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice {
  @Element() host!: HTMLElement

  private readonly typeList = unionToTuple<typeof this.kind>()('sku', 'bundle')

  /**
   * Indicates whether the code refers to a `sku` or a `bundle`.
   */
  @Prop({ reflect: true }) kind: 'sku' | 'bundle' | undefined = 'sku'

  /**
   * The SKU code (i.e. the unique identifier of the product whose price you want to display).
   */
  @Prop({ reflect: true }) code!: string | undefined

  async componentWillLoad(): Promise<void> {
    logCode(this.host, this.code)
    await this.updatePrice(this.kind, this.code)
  }

  @Watch('code')
  async watchCodeHandler(newValue: typeof this.code): Promise<void> {
    logCode(this.host, newValue)
    await this.updatePrice(this.kind, newValue)
  }

  @Watch('kind')
  async watchKindHandler(newValue: typeof this.kind): Promise<void> {
    logUnion(this.host, 'kind', newValue, this.typeList)
    await this.updatePrice(newValue, this.code)
  }

  private async updatePrice(
    kind: typeof this.kind,
    code: typeof this.code
  ): Promise<void> {
    if (isValidCode(code)) {
      let price: Price | undefined

      switch (kind) {
        case 'sku':
          price = await getSkuPrice(code)
          break

        case 'bundle':
          price = await getBundlePrice(code)
          break

        default:
          break
      }

      this.host.querySelectorAll('cl-price-amount').forEach((element) => {
        element.dispatchEvent(
          new CustomEvent<Price>('priceUpdate', { detail: price })
        )
      })
    }
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
