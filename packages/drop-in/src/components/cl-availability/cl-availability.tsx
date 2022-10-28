import { getSku, Sku } from '#apis/commercelayer/skus'
import { logSku, validateSku } from '#utils/validation-helpers'
import { Component, Element, h, JSX, Prop, Watch } from '@stencil/core'

@Component({
  tag: 'cl-availability',
  shadow: true
})
export class ClAvailability {
  @Element() host!: HTMLElement

  @Prop({ reflect: true }) sku: string | undefined

  async componentWillLoad(): Promise<void> {
    if (validateSku(this.sku)) {
      const sku = await getSku(this.sku)

      if (sku !== undefined) {
        this.updateAvailability(sku)
      }
    }

    logSku(this.host, this.sku)
  }

  @Watch('sku')
  watchPropHandler(newValue: string, _oldValue: string): void {
    logSku(this.host, newValue)
  }

  private updateAvailability(sku: Sku): void {
    this.host
      .querySelectorAll('cl-availability-status, cl-availability-message')
      .forEach((element) => {
        element.dispatchEvent(
          new CustomEvent<Sku>('skuUpdate', { detail: sku })
        )
      })
  }

  render(): JSX.Element {
    return <slot></slot>
  }
}
