// biome-ignore lint/correctness/noUnusedImports: "h" is used by the classic JSX pragma
import { h } from "@stencil/core"
import { render } from "@stencil/vitest"
import { vi } from "vitest"
import * as client from "@/apis/commercelayer/client"
import { stripHydrationFlags } from "@/testing/spec-helpers"
import * as logger from "@/utils/logger"
import "./cl-identity-info"

afterEach(() => {
  vi.restoreAllMocks()
})

describe("cl-identity-info.spec", () => {
  it("renders without attributes", async () => {
    const { root, waitForChanges } = await render(
      // @ts-expect-error - intentionally testing the "field" attribute unset
      <cl-identity-info />,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-info>
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-info>
    `)
  })

  it("renders as empty box when 'field' attribute is empty", async () => {
    const logSpy = vi.spyOn(logger, "log")

    vi.spyOn(client, "getCustomer").mockImplementation(async () => ({
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

    const { root, waitForChanges } = await render(
      <cl-identity-info field="metadata.age" />,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-info field="metadata.age">
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-info>
    `)

    expect(logSpy).toHaveBeenCalledTimes(0)
  })

  it("shows a warning message in the console when 'field' attribute is not existing", async () => {
    const logSpy = vi.spyOn(logger, "log")

    vi.spyOn(client, "getCustomer").mockImplementation(async () => ({
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

    const { root, waitForChanges } = await render(
      <cl-identity-info field="name" />,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-info field="name">
        <mock:shadow-root></mock:shadow-root>
      </cl-identity-info>
    `)

    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith(
      "warn",
      '"field" attribute should be one of "email", "metadata.*". Received: "name"',
      root,
    )
  })

  it("renders with a valid 'metadata.*' field attribute", async () => {
    vi.spyOn(client, "getCustomer").mockImplementation(async () => ({
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

    const { root, waitForChanges } = await render(
      <cl-identity-info field="metadata.firstname" />,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <cl-identity-info field="metadata.firstname">
        <mock:shadow-root>
          John
        </mock:shadow-root>
      </cl-identity-info>
    `)
  })

  it("renders with a more complex message (combining different field attributes)", async () => {
    vi.spyOn(client, "getCustomer").mockImplementation(async () => ({
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

    const { root, waitForChanges } = await render(
      <div>
        Hi
        <cl-identity-info field="metadata.firstname" />
        <cl-identity-info field="metadata.lastname" />
        (<cl-identity-info field="email" />)
      </div>,
      { waitForReady: false },
    )

    await waitForChanges()

    stripHydrationFlags(root)
    expect(root).toEqualHtml(`
      <div>
        Hi
        <cl-identity-info field="metadata.firstname">
          <mock:shadow-root>
            John
          </mock:shadow-root>
        </cl-identity-info>
        <cl-identity-info field="metadata.lastname">
          <mock:shadow-root>
            Doe
          </mock:shadow-root>
        </cl-identity-info>
        (
          <cl-identity-info field="email">
            <mock:shadow-root>
              test@example.com
            </mock:shadow-root>
          </cl-identity-info>
        )
      </div>
    `)
  })
})
