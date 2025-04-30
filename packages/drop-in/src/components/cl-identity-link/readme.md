# cl-identity-link



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                                           | Default     |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `scope`             | `scope`   | Your sales channel [scope](https://docs.commercelayer.io/core/authentication#authorization-scopes) (used to restrict the dataset of your application to a market and/or stock location). If specified, it will override the default scope set in the drop-in library configuration. Otherwise, the default scope taken from the drop-in library configuration will be used. | `string \| undefined`                          | `undefined` |
| `target`            | `target`  | The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).                                                                                                                                                                                                                                                                               | `"_blank" \| "_parent" \| "_self" \| "_top"`   | `"_self"`   |
| `type` _(required)_ | `type`    | The user account access action.                                                                                                                                                                                                                                                                                                                                             | `"login" \| "logout" \| "signup" \| undefined` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
