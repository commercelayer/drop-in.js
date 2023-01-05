import { Component, Host, h, JSX } from '@stencil/core'

@Component({
  tag: 'cl-storage',
  shadow: true
})
export class ClStorage {
  render(): JSX.Element {
    return (
      <Host>
        <iframe part='iframe' src='http://localhost:3000' />
      </Host>
    )
  }
}
