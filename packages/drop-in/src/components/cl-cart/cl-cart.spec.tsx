import { newSpecPage } from "@stencil/core/testing"
import { mockedAccessToken } from "jest.spec.helpers"
import * as cart from "#apis/commercelayer/cart"
import * as client from "#apis/commercelayer/client"
import { ClCartLink } from "#components/cl-cart-link/cl-cart-link"
import { ClCart } from "./cl-cart"

beforeEach(() => {
  jest.resetAllMocks()
})

describe("cl-cart.spec", () => {
  it("renders", async () => {
    jest.spyOn(client, "getAccessToken").mockResolvedValue({
      type: "guest",
      accessToken: mockedAccessToken,
      scope: "market:code:usa",
    })

    jest
      .spyOn(cart, "getCartUrl")
      .mockResolvedValue("https://example.com/checkout-url")

    const page = await newSpecPage({
      components: [ClCart],
      html: "<cl-cart></cl-cart>",
    })

    expect(page.root).toEqualHtml(`
      <cl-cart>
        <mock:shadow-root>
          <div part="container">
            <iframe
              part="iframe"
              title="My Cart"
              id="iFrameResizer0"
              allow="payment"
              src="https://example.com/checkout-url"
              style="width: 1px; min-width: 100%; min-height: 100%; border: none; overflow: hidden;"
            ></iframe>
          </div>
        </mock:shadow-root>
      </cl-cart>
    `)
  })

  it("renders as minicart when used inside a `cl-cart-link`.", async () => {
    jest
      .spyOn(cart, "getCartUrl")
      .mockResolvedValue("https://example.com/checkout-url")

    const page = await newSpecPage({
      components: [ClCart, ClCartLink],
      html: `
        <cl-cart-link>
          <cl-cart></cl-cart>
        </cl-cart-link>
      `,
    })

    await page.waitForChanges()

    expect(page.root).toEqualHtml(`
      <cl-cart-link cl-hydrated role="button" tabindex="0" target="_self">
        <cl-cart type="mini" aria-hidden="true" tabindex="-1">
          <mock:shadow-root>
            <div part="container">
              <button aria-label="Close" part="close-button" type="button">
                Close
              </button>
              <iframe
                part="iframe"
                title="My Cart"
                id="iFrameResizer1"
                allow="payment"
                style="width: 1px; min-width: 100%; min-height: 100%; border: none; overflow: hidden;"
              ></iframe>
            </div>
          </mock:shadow-root>
        </cl-cart>
      </cl-cart-link>
    `)

    page.root?.click()

    await page.waitForChanges()

    expect(page.root).toEqualHtml(`
      <cl-cart-link cl-hydrated role="button" tabindex="0" target="_self">
        <cl-cart type="mini" open role="alertdialog" aria-modal="true">
          <mock:shadow-root>
            <div part="container">
              <button aria-label="Close" part="close-button" type="button">
                Close
              </button>
              <iframe
                part="iframe"
                title="My Cart"
                id="iFrameResizer1"
                allow="payment"
                src="https://example.com/checkout-url"
                style="width: 1px; min-width: 100%; min-height: 100%; border: none; overflow: hidden;"
              ></iframe>
            </div>
          </mock:shadow-root>
        </cl-cart>
      </cl-cart-link>
    `)
  })
})
