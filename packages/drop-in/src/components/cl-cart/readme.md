# cl-cart



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute     | Description                                                                                                                                                        | Type                  | Default     |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `open`      | `open`        | Indicate whether the minicart is open or not (available _only_ when the `cl-cart` component is used as _minicart_).                                                | `boolean`             | `false`     |
| `openOnAdd` | `open-on-add` | If `true` the minicart automatically opens as soon as an item is added to the shopping cart (available _only_ when the `cl-cart` component is used as _minicart_). | `boolean`             | `false`     |
| `type`      | `type`        | By default the `cl-cart` is directly displayed in-place. Setting the `type` to `mini` will change the behavior to be a minicart.                                   | `"mini" \| undefined` | `undefined` |


## Methods

### `openMinicart(opener: HTMLElement) => Promise<void>`

Open the minicart and set the opener so that the minicart can be closed by focusing on the opener.
(available _only_ when the `cl-cart` component is used as _minicart_).

#### Parameters

| Name     | Type          | Description                 |
| -------- | ------------- | --------------------------- |
| `opener` | `HTMLElement` | The opener of the minicart. |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"close-button"` |             |
| `"container"`    |             |
| `"iframe"`       |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
