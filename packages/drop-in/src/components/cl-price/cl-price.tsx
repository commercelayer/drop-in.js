import { getPrice as getBundlePrice } from '#apis/commercelayer/bundles'
import { getPrice as getSkuPrice } from '#apis/commercelayer/skus'
import {
  isValidCode,
  logCode,
  logUnion,
  unionToTuple
} from '#utils/validation-helpers'
import type { Price } from '@commercelayer/sdk'
import { Component, Element, Prop, Watch, h, type JSX } from '@stencil/core'
import debounce from 'lodash/debounce'

export interface Props {
  code: string | undefined
}

@Component({
  tag: 'cl-price',
  shadow: true
})
export class CLPrice {
  @Element() host!: HTMLElement

  private readonly kindList = unionToTuple<typeof this.kind>()('sku', 'bundle')

  private readonly kindDefault: NonNullable<typeof this.kind> = 'sku'

  /**
   * Indicates whether the code refers to a `sku` or a `bundle`.
   * @default sku
   */
  @Prop({ reflect: true, mutable: true }) kind?: 'sku' | 'bundle' = 'sku'

  /**
   * The SKU or the bundle code (i.e. the unique identifier of the product or bundle whose price you want to display).
   */
  @Prop({ reflect: true }) code!: string | undefined

  async componentWillLoad(): Promise<void> {
    logCode(this.host, this.code)
    await this.updatePrice(this.kind, this.code)
  }

  @Watch('kind')
  async watchKindHandler(newValue: typeof this.kind): Promise<void> {
    if (newValue == null) {
      this.kind = this.kindDefault
      return
    }

    logUnion(this.host, 'kind', newValue, this.kindList)
    await this.debouncedUpdatePrice(newValue, this.code)
  }

  @Watch('code')
  async watchCodeHandler(newValue: typeof this.code): Promise<void> {
    logCode(this.host, newValue)
    await this.debouncedUpdatePrice(this.kind, newValue)
  }

  private readonly updatePrice = async (
    kind: typeof this.kind,
    code: typeof this.code
  ): Promise<void> => {
    let price: Price | undefined

    if (isValidCode(code)) {
      switch (kind) {
        case 'bundle':
          price = await getBundlePrice(code)
          break

        case 'sku':
        default:
          price = await getSkuPrice(code)
          break
      }
    }

    this.host.querySelectorAll('cl-price-amount').forEach((element) => {
      element.dispatchEvent(
        new CustomEvent<Price>('priceUpdate', { detail: price })
      )
    })
  }

  private readonly debouncedUpdatePrice = debounce(this.updatePrice, 10)

  render(): JSX.Element {
    return <slot></slot>
  }
}
