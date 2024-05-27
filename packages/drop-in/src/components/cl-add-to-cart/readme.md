# cl-add-to-cart



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute   | Description                                                                                                                                                                                  | Type                             | Default     |
| ------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `code` _(required)_ | `code`      | The SKU code (i.e. the unique identifier of the product you want to add to the shopping cart).                                                                                               | `string \| undefined`            | `undefined` |
| `frequency`         | `frequency` | The frequency which generates a [subscription](https://docs.commercelayer.io/core/v/how-tos/placing-orders/subscriptions). The value must be supported by the associated subscription model. | `string \| undefined`            | `undefined` |
| `kind`              | `kind`      | Indicates whether the code refers to a `sku` or a `bundle`.                                                                                                                                  | `"bundle" \| "sku" \| undefined` | `'sku'`     |
| `quantity`          | `quantity`  | The number of units of the selected product you want to add to the shopping cart.                                                                                                            | `number`                         | `1`         |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
