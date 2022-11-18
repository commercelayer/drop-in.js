import { getSku, Sku } from '#apis/commercelayer/skus'
import { logCode, validateCode } from '#utils/validation-helpers'
import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core'

export interface Props {
  code: string | undefined
}
@Component({
  tag: 'cl-availability',
  shadow: true
})
export class ClAvailability implements Props {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) code: string | undefined

  async componentWillLoad(): Promise<void> {
    if (validateCode(this.code)) {
      const sku = await getSku(this.code)

      if (sku !== undefined) {
        this.updateAvailability(sku)
      }
    }

    logCode(this.host, this.code)
  }

  @Watch('code')
  watchPropHandler(newValue: string, _oldValue: string): void {
    logCode(this.host, newValue)
  }

  private updateAvailability(item: Sku): void {
    this.host
      .querySelectorAll('cl-availability-status, cl-availability-info')
      .forEach((element) => {
        element.dispatchEvent(
          new CustomEvent<Sku>('availabilityUpdate', { detail: item })
        )
      })
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
