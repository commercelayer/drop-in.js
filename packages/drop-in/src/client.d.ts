/* eslint-disable */
/* tslint:disable */

/**
 * Add the following triple-slash directive:
 * ```ts
 * /// <reference types="@commercelayer/drop-in.js" />
 * ```
 */

import { CommerceLayerConfig } from './apis/commercelayer/config'
import { JSX as DropInJSX } from './components'

export type { CommerceLayerConfig }

declare global {
  interface Window {
    commercelayerConfig: CommerceLayerConfig
  }

  module astroHTML.JSX {
    interface IntrinsicElements extends DropInElements { }

    type DropInElements = {
      [Key in keyof DropInJSX.IntrinsicElements]: (
        // @ts-expect-error This is a valid attribute
        & astroHTML.JSX.HTMLAttributes
        & DropInJSX.IntrinsicElements[Key]
      )
    }
  }

  module React.JSX {
    interface IntrinsicElements extends DropInElements { }

    type DropInElements = {
      [Key in keyof DropInJSX.IntrinsicElements]: (
        // @ts-expect-error This is a valid attribute
        & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        & DropInJSX.IntrinsicElements[Key]
      )
    }
  }
}
