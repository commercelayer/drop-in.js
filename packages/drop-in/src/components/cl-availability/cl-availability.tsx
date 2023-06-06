import { getSku } from '#apis/commercelayer/skus'
import type { Sku } from '#apis/types'
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

      if (sku !== undefined) {
        this.host
          .querySelectorAll('cl-availability-status, cl-availability-info')
          .forEach((element) => {
            element.dispatchEvent(
              new CustomEvent<Sku>('availabilityUpdate', { detail: sku })
            )
          })
      }
    }
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
