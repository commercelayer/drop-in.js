import { newSpecPage } from "@stencil/core/testing"
import { mockedAccessToken } from "jest.spec.helpers"
import * as client from "@/apis/commercelayer/client"
import * as config from "@/apis/commercelayer/config"
import { fireEvent } from "@/apis/event"
import { ClMyAccountLink } from "./cl-my-account-link"

beforeEach(() => {
  jest.resetAllMocks()
})

describe("cl-my-account-link.spec", () => {
  it("renders the my-account without href when guest", async () => {
    jest.spyOn(client, "getAccessToken").mockResolvedValue({
      type: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    jest.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: "<cl-my-account-link>My Account</cl-my-account-link>",
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_self">
        <a target="_self">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it("renders the my-account with a defined target", async () => {
    jest.spyOn(client, "getAccessToken").mockResolvedValue({
      type: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    jest.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link target="_blank">My Account</cl-my-account-link>',
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_blank">
        <a target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it("renders the my-account url when user is logged in", async () => {
    jest.spyOn(client, "getAccessToken").mockResolvedValue({
      type: "customer",
      customerId: "1234",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    jest.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link target="_blank">My Account</cl-my-account-link>',
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank">
        <a href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123&lang=en" target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })

  it("renders the my-account without href when user logged out", async () => {
    jest.spyOn(client, "getAccessToken").mockResolvedValue({
      type: "customer",
      customerId: "1234",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    jest.spyOn(config, "getOrganizationConfig").mockResolvedValue({
      links: {
        my_account:
          "https://drop-in-js.commercelayer.app/my-account?accessToken=token-123",
        identity: "https://drop-in-js.commercelayer.app/identity",
        cart: "https://drop-in-js.commercelayer.app/cart/:order_id?accessToken=token-123",
        checkout:
          "https://drop-in-js.commercelayer.app/checkout/:order_id?accessToken=token-123",
      },
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [ClMyAccountLink],
      html: '<cl-my-account-link target="_blank">My Account</cl-my-account-link>',
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link target="_blank">
        <a href="https://drop-in-js.commercelayer.app/my-account?accessToken=token-123&lang=en" target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)

    jest.spyOn(client, "getAccessToken").mockResolvedValue({
      type: "guest",
      accessToken: "token-1234",
      scope: "market:code:usa",
    })
    fireEvent("cl-identity-gettoken", [], {
      type: "guest",
      accessToken: "token-1234",
      scope: "market:code:usa",
    })

    await waitForChanges()
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-my-account-link aria-disabled="true" target="_blank">
        <a target="_blank">
          My Account
        </a>
      </cl-my-account-link>
    `)
  })
})
