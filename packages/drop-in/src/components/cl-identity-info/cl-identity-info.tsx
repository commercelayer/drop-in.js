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
import { get } from "lodash-es"
import { customerFields, getCustomer } from "#apis/commercelayer/client"
import { log } from "#utils/logger"

@Component({
  tag: "cl-identity-info",
  shadow: true,
})
export class ClIdentityInfo {
  @Element() host!: HTMLClIdentityInfoElement

  private readonly fieldList = customerFields.filter(
    (v) => v !== "metadata",
  ) as string[]

  /**
   * The field to be displayed.
   *
   * Valid values are:
   * - "`email`"
   * - "`metadata.*`" _(e.g. "metadata.firstname", etc.)_
   */
  @Prop({ reflect: true }) field!: string

  /**
   * Displayed text.
   */
  @State() text: string | undefined

  async componentWillLoad(): Promise<void> {
    this.logField(this.field)
    this.renderValue(this.field)
  }

  @Watch("field")
  async watchTypeHandler(newValue: typeof this.field): Promise<void> {
    this.logField(newValue)
    this.renderValue(newValue)
  }

  private isValidField(field: typeof this.field): boolean {
    return (
      field != null &&
      (this.fieldList.includes(field as any) ||
        /^metadata\..{1,}$/.test(field.trim()))
    )
  }

  private logField(field: typeof this.field): void {
    if (!this.isValidField(field)) {
      log(
        "warn",
        `"field" attribute should be one of ${this.fieldList
          .map((v) => `"${v}"`)
          .join(", ")}, "metadata.*". Received: "${field ?? "undefined"}"`,
        this.host,
      )
    }
  }

  private async renderValue(field: typeof this.field): Promise<void> {
    if (!this.isValidField(field)) {
      this.text = undefined
      return
    }

    const customer = await getCustomer()
    const value = get(customer, field)

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "bigint"
    ) {
      this.text = value.toString()
      return
    }

    this.text = undefined
  }

  render(): JSX.Element {
    return <Host>{this.text}</Host>
  }
}
