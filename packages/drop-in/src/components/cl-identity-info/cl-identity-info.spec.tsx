import { newSpecPage } from "@stencil/core/testing"
import * as client from "@/apis/commercelayer/client"
import * as logger from "@/utils/logger"
import { ClIdentityInfo } from "./cl-identity-info"

describe("cl-identity-info.spec", () => {
  it("renders without attributes", async () => {
    const page = await newSpecPage({
      components: [ClIdentityInfo],
      html: "<cl-identity-info></cl-identity-info>",
    })
    expect(page.root).toEqualHtml(`
      <cl-identity-info>
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-info>
    `)
  })

  it("renders as empty box when 'field' attribute is empty", async () => {
    const logSpy = jest.spyOn(logger, "log")

    jest.spyOn(client, "getCustomer").mockImplementation(async () => ({
      type: "customers",
      id: "12345",
      created_at: "2023-10-01T00:00:00Z",
      updated_at: "2023-10-01T00:00:00Z",
      email: "test@example.com",
      status: "acquired",
      metadata: {
        firstname: "John",
        lastname: "Doe",
      },
    }))

    const { body } = await newSpecPage({
      components: [ClIdentityInfo],
      html: `<cl-identity-info field='metadata.age'></cl-identity-info>`,
    })

    expect(body).toEqualHtml(`
      <cl-identity-info field="metadata.age">
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-info>
    `)

    expect(logSpy).toHaveBeenCalledTimes(0)
  })

  it("shows a warning message in the console when 'field' attribute is not existing", async () => {
    const logSpy = jest.spyOn(logger, "log")

    jest.spyOn(client, "getCustomer").mockImplementation(async () => ({
      type: "customers",
      id: "12345",
      created_at: "2023-10-01T00:00:00Z",
      updated_at: "2023-10-01T00:00:00Z",
      email: "test@example.com",
      status: "acquired",
      metadata: {
        firstname: "John",
        lastname: "Doe",
      },
    }))

    const { body } = await newSpecPage({
      components: [ClIdentityInfo],
      html: `<cl-identity-info field='name'></cl-identity-info>`,
    })

    expect(body).toEqualHtml(`
      <cl-identity-info field="name">
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-info>
    `)

    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith(
      "warn",
      '"field" attribute should be one of "email", "metadata.*". Received: "name"',
      body.querySelector("cl-identity-info"),
    )
  })

  it("renders with a valid 'metadata.*' field attribute", async () => {
    jest.spyOn(client, "getCustomer").mockImplementation(async () => ({
      type: "customers",
      id: "12345",
      created_at: "2023-10-01T00:00:00Z",
      updated_at: "2023-10-01T00:00:00Z",
      email: "test@example.com",
      status: "acquired",
      metadata: {
        firstname: "John",
        lastname: "Doe",
      },
    }))

    const { body } = await newSpecPage({
      components: [ClIdentityInfo],
      html: `<cl-identity-info field='metadata.firstname'></cl-identity-info>`,
    })

    expect(body).toEqualHtml(`
      <cl-identity-info field="metadata.firstname">
        <mock:shadow-root>John</mock:shadow-root>
      </cl-identity-info>
    `)
  })

  it("renders with a more complex message (combining different field attributes)", async () => {
    jest.spyOn(client, "getCustomer").mockImplementation(async () => ({
      type: "customers",
      id: "12345",
      created_at: "2023-10-01T00:00:00Z",
      updated_at: "2023-10-01T00:00:00Z",
      email: "test@example.com",
      status: "acquired",
      metadata: {
        firstname: "John",
        lastname: "Doe",
      },
    }))

    const { body } = await newSpecPage({
      components: [ClIdentityInfo],
      html: `
        <div>
          Hi
          <cl-identity-info field='metadata.firstname'></cl-identity-info>
          <cl-identity-info field='metadata.lastname'></cl-identity-info>
          (<cl-identity-info field='email'></cl-identity-info>)
        </div>
      `,
    })

    expect(body).toEqualHtml(`
      <div>
        Hi
        <cl-identity-info field="metadata.firstname">
          <mock:shadow-root>John</mock:shadow-root>
        </cl-identity-info>
        <cl-identity-info field="metadata.lastname">
          <mock:shadow-root>Doe</mock:shadow-root>
        </cl-identity-info>
        (
          <cl-identity-info field="email">
            <mock:shadow-root>test@example.com</mock:shadow-root>
          </cl-identity-info>
        )
      </div>
    `)
  })
})
