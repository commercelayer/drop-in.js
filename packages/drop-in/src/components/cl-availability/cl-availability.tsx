import { getSku } from '#apis/commercelayer/skus'
import type { Sku } from '#apis/types'
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
    logCode(this.host, this.code)
    await this.updateAvailability(this.code)
  }

  @Watch('code')
  async watchPropHandler(newValue: string, _oldValue: string): Promise<void> {
    logCode(this.host, newValue)
    await this.updateAvailability(newValue)
  }

  private async updateAvailability(code: string | undefined): Promise<void> {
    if (validateCode(code)) {
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
