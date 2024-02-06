import { getSku } from '#apis/commercelayer/skus'
import type { AvailabilityUpdateEventPayload } from '#apis/types'
import { isValidCode, logCode } from '#utils/validation-helpers'
import { Component, Element, Prop, Watch, h, type JSX } from '@stencil/core'

@Component({
  tag: 'cl-availability',
  shadow: true
})
export class ClAvailability {
  @Element() host!: HTMLElement

  /**
   * The SKU code (i.e. the unique identifier of the product whose availability you want to display).
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
    await this.updateAvailability(this.code)
  }

  @Watch('code')
  async watchPropHandler(newValue: typeof this.code): Promise<void> {
    logCode(this.host, newValue)
    await this.updateAvailability(newValue)
  }

  private async updateAvailability(code: typeof this.code): Promise<void> {
    if (isValidCode(code)) {
      const sku = await getSku(code)

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
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
