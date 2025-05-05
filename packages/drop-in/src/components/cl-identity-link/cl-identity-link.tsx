import {
  Component,
  Element,
  Host,
  type JSX,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core"
import { getIdentityUrl } from "#apis/commercelayer/account"
import { logout } from "#apis/commercelayer/client"
import { isValidUnion, logUnion, unionToTuple } from "#utils/validation-helpers"

@Component({
  tag: "cl-identity-link",
  shadow: false,
})
export class ClIdentityLink {
  @Element() host!: HTMLClIdentityLinkElement

  private readonly typeList = unionToTuple<typeof this.type>()(
    "login",
    "signup",
    "logout",
  )

  /**
   * The browsing context in which to open the linked URL (a tab, a window, or an &lt;iframe&gt;).
   */
  @Prop({ reflect: true }) target: "_self" | "_blank" | "_parent" | "_top" =
    "_self"

  /**
   * The user account access action.
   */
  @Prop({ reflect: true }) type!: "login" | "signup" | "logout" | undefined

  /**
   * Your sales channel [scope](https://docs.commercelayer.io/core/authentication#authorization-scopes)
   * (used to restrict the dataset of your application to a market and/or stock location).
   * If specified, it will override the default scope set in the drop-in library configuration.
   * Otherwise, the default scope taken from the drop-in library configuration will be used.
   */
  @Prop({ reflect: true }) scope?: string

  @State() href: string | undefined

  async componentWillLoad(): Promise<void> {
    await this.updateUrl(this.type)
  }

  @Watch("type")
  async watchTypeHandler(newValue: typeof this.type): Promise<void> {
    await this.updateUrl(newValue)
  }

  private async updateUrl(type: typeof this.type): Promise<void> {
    this.href = isValidUnion(type, this.typeList)
      ? await getIdentityUrl(type, this.scope)
      : undefined

    logUnion(this.host, "type", type, this.typeList)
  }

  render(): JSX.Element {
    return (
      <Host
        aria-disabled={
          isValidUnion(this.type, this.typeList) && this.href !== undefined
            ? undefined
            : "true"
        }
      >
        <a
          target={this.target}
          href={this.href}
          onClick={(event) => {
            if (this.type === "logout") {
              event.preventDefault()
              void logout().then(() => {
                location.reload()
              })
            }
          }}
        >
          <slot />
        </a>
      </Host>
    )
  }
}
