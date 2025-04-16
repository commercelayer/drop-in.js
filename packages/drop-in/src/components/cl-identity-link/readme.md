# cl-identity-link



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Type                                           | Default     |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `scope`             | `scope`   | String specified during the authentication flow to restrict the scope of the obtained access token to a market and/or stock location. Example: `market:code:usa` or `stock_location:code:eu` or `market:code:eu stock_location:code:eu`  This is optional, as by default the scope is taken from the drop-in.js configuration. This property is particularly useful when you want to set a scope related to a private market (restricted to a customer group). | `string \| undefined`                          | `undefined` |
| `target`            | `target`  | The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).                                                                                                                                                                                                                                                                                                                                                                  | `"_blank" \| "_parent" \| "_self" \| "_top"`   | `"_self"`   |
| `type` _(required)_ | `type`    | The user account access action.                                                                                                                                                                                                                                                                                                                                                                                                                                | `"login" \| "logout" \| "signup" \| undefined` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
