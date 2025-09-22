import {
  Component,
  Element,
  Host,
  // biome-ignore lint/correctness/noUnusedImports: "h" is used in the render method
  h,
  type JSX,
  Prop,
  State,
  Watch,
} from "@stencil/core"
import { getAccessToken } from "@/apis/commercelayer/client"
import { getConfig } from "@/apis/commercelayer/config"
import { listenTo } from "@/apis/event"
import {
  isValidUnion,
  logUnion,
  unionToTuple,
} from "@/utils/validation-helpers"

@Component({
  tag: "cl-identity-status",
  shadow: true,
})
export class ClIdentityStatus {
  @Element() host!: HTMLClIdentityStatusElement

  private readonly typeList = unionToTuple<typeof this.type>()(
    "guest",
    "customer",
  )

  /**
   * The user identity status (logged in or not logged in).
   * It determines the visibility of the inner message based on the stored token.
   */
  @Prop({ reflect: true }) type!: "guest" | "customer" | undefined

  @State() status: typeof this.type

  async componentWillLoad(): Promise<void> {
    listenTo("cl-identity-gettoken", (event) => {
      this.status = event.detail.response.type
    })

    const config = getConfig()
    this.status = (await getAccessToken(config)).type

    this.logType(this.type)
  }

  @Watch("type")
  async watchTypeHandler(newValue: typeof this.type): Promise<void> {
    this.logType(newValue)
  }

  private logType(type: typeof this.type): void {
    logUnion(this.host, "type", type, this.typeList)
  }

  render(): JSX.Element {
    if (
      isValidUnion(this.type, this.typeList) &&
      isValidUnion(this.status, this.typeList) &&
      this.type === this.status
    ) {
      return <slot />
    }

    return <Host aria-disabled="true" />
  }
}
