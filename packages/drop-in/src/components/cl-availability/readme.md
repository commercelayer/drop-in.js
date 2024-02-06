# cl-availability



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description                                                                                                                                                                                                                                     | Type                      | Default      |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------ |
| `code` _(required)_ | `code`    | The SKU code (i.e. the unique identifier of the product whose availability you want to display).                                                                                                                                                | `string \| undefined`     | `undefined`  |
| `rule`              | `rule`    | The rule used to determine the information that will be displayed. `cheapest` is the delivery lead time associated with the lower shipping method cost, `fastest` is the delivery lead time associated with the lower average time to delivery. | `"cheapest" \| "fastest"` | `'cheapest'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
