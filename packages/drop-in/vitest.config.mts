import { fileURLToPath } from "node:url"
import { defineVitestConfig } from "@stencil/vitest/config"
import { stencilVitestPlugin } from "@stencil/vitest/plugin"
import { playwright } from "@vitest/browser-playwright"

const srcDir = fileURLToPath(new URL("./src", import.meta.url))

export default defineVitestConfig({
  stencilConfig: "./stencil.config.ts",
  test: {
    projects: [
      {
        plugins: [stencilVitestPlugin()],
        // Vite 8's oxc transformer defaults JSX to development mode, which
        // injects `__self`/`__source` props onto every h() call and breaks
        // toEqualHtml() snapshot comparisons. @stencil/vitest only fills in
        // `oxc.jsx` when it's unset, so setting it here (with development:
        // false) overrides its default instead of relying on it.
        oxc: {
          jsx: {
            runtime: "classic",
            pragma: "h",
            pragmaFrag: "Fragment",
            development: false,
          },
        },
        resolve: {
          alias: {
            "@": srcDir,
          },
        },
        test: {
          name: "spec",
          globals: true,
          environment: "stencil",
          include: ["src/**/*.spec.{ts,tsx}"],
          setupFiles: ["./vitest.setup.ts"],
          // A handful of spec files (cl-identity-link, cl-identity-status,
          // cl-my-account-link) genuinely hit Commerce Layer's live sandbox
          // API for organization/config lookups (a pre-existing property of
          // these tests, unrelated to the test runner). Give real network
          // round-trips room.
          testTimeout: 15000,
        },
      },
      {
        resolve: {
          alias: {
            "@": srcDir,
          },
        },
        test: {
          name: "e2e",
          globals: true,
          include: ["src/**/*.e2e.{ts,tsx}"],
          setupFiles: ["./vitest.e2e-setup.ts"],
          // Real browser + real network against the Commerce Layer sandbox —
          // give it real room (matches the old jest e2e runner's generous
          // timeout for the same reason).
          testTimeout: 30000,
          browser: {
            enabled: true,
            provider: playwright({ launchOptions: { channel: "chrome" } }),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
})
