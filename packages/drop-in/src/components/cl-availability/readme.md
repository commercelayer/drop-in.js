# cl-availability



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description                                                                                                                                                                                                                                     | Type                             | Default      |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------ |
| `code` _(required)_ | `code`    | The SKU or bundle code (i.e. the unique identifier of the product or bundle whose availability you want to display).                                                                                                                            | `string \| undefined`            | `undefined`  |
| `kind`              | `kind`    | Indicates whether the code refers to a `sku` or a `bundle`.  _⚠️ `bundle` is not fully implemented._                                                                                                                                            | `"bundle" \| "sku" \| undefined` | `"sku"`      |
| `rule`              | `rule`    | The rule used to determine the information that will be displayed. `cheapest` is the delivery lead time associated with the lower shipping method cost, `fastest` is the delivery lead time associated with the lower average time to delivery. | `"cheapest" \| "fastest"`        | `"cheapest"` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
