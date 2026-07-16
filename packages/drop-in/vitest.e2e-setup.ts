import { beforeAll } from "vitest"

// Load the pre-built lazy-loader output and register every custom element —
// this is the exact mechanism real consumers use (same as the `www` demo
// bundle), unlike `dist/components/index.js` (the library entry point,
// which only re-exports Stencil-core internals, not the components
// themselves — confirmed empirically that importing it registers nothing).
// Deliberately NOT using stencilVitestPlugin here: e2e tests exercise the
// real, unmocked production build against the live Commerce Layer sandbox,
// so there's no need for module mocking, and using the real dist build
// means the real `cl-hydrated` attribute (this project's custom
// hydratedFlag) shows up correctly — unlike the plugin used for spec tests,
// which always applies Stencil's default `class="hydrated"` instead.
beforeAll(async () => {
  const { defineCustomElements } = await import("./dist/esm/loader.js")
  await defineCustomElements()
})
