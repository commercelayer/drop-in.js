import { getSku } from '#apis/commercelayer/skus'
import type { AvailabilityUpdateEventPayload, Sku } from '#apis/types'
import {
  isValidCode,
  logCode,
  logUnion,
  unionToTuple
} from '#utils/validation-helpers'
import { Component, Element, Prop, Watch, h, type JSX } from '@stencil/core'
import debounce from 'lodash/debounce'

@Component({
  tag: 'cl-availability',
  shadow: true
})
export class ClAvailability {
  @Element() host!: HTMLElement

  private readonly kindList = unionToTuple<typeof this.kind>()('sku', 'bundle')

  private readonly kindDefault: NonNullable<typeof this.kind> = 'sku'

  /**
   * Indicates whether the code refers to a `sku` or a `bundle`.
   *
   * _⚠️ `bundle` is not fully implemented._
   *
   * @default sku
   */
  @Prop({ reflect: true, mutable: true }) kind?: 'sku' | 'bundle' = 'sku'

  /**
   * The SKU or the bundle code (i.e. the unique identifier of the product or bundle whose availability you want to display).
   */
  @Prop({ reflect: true }) code!: string | undefined

  /**
   * The rule used to determine the information that will be displayed.
   * `cheapest` is the delivery lead time associated with the lower shipping method cost,
   * `fastest` is the delivery lead time associated with the lower average time to delivery.
   */
  @Prop({ reflect: true }) rule: 'cheapest' | 'fastest' = 'cheapest'

  async componentWillLoad(): Promise<void> {
    logCode(this.host, this.code)
    await this.updateAvailability(this.kind, this.code)
  }

  @Watch('kind')
  async watchKindHandler(newValue: typeof this.kind): Promise<void> {
    if (newValue == null) {
      this.kind = this.kindDefault
      return
    }

    logUnion(this.host, 'kind', newValue, this.kindList)
    await this.debouncedUpdateAvailability(newValue, this.code)
  }

  @Watch('code')
  async watchPropHandler(newValue: typeof this.code): Promise<void> {
    logCode(this.host, newValue)
    await this.debouncedUpdateAvailability(this.kind, newValue)
  }

  private readonly updateAvailability = async (
    kind: typeof this.kind,
    code: typeof this.code
  ): Promise<void> => {
    let sku: Sku | undefined

    if (kind !== 'bundle' && isValidCode(code)) {
      sku = await getSku(code)
    }

    this.host
      .querySelectorAll('cl-availability-status, cl-availability-info')
      .forEach((element) => {
        element.dispatchEvent(
          new CustomEvent<AvailabilityUpdateEventPayload>(
            'availabilityUpdate',
            {
              detail: { sku, rule: this.rule }
            }
          )
        )
      })
  }

  private readonly debouncedUpdateAvailability = debounce(
    this.updateAvailability,
    10
  )

  render(): JSX.Element {
    return <slot></slot>
  }
}
