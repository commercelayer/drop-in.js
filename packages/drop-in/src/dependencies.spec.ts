/// <reference types="node" />
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

/** Lines of the workspace lockfile that resolve a package from a pkg.pr.new preview build. */
function findPreviewDependencies(): string[] {
  const lockfile = readFileSync(
    resolve(__dirname, "..", "..", "..", "pnpm-lock.yaml"),
    "utf8",
  )

  return lockfile
    .split("\n")
    .flatMap((line, index) =>
      line.includes("pkg.pr.new") ? [`${index + 1}: ${line.trim()}`] : [],
    )
}

const { CI } = process.env

/** Runs in CI only, so a preview dependency can be committed while developing but blocks the PR. */
describe.skipIf(CI === undefined)("Dependencies", () => {
  it("should avoid using pkg.pr.new", () => {
    const previewDependencies = findPreviewDependencies()

    expect(previewDependencies, previewDependencies.join("\n")).toEqual([])
  })
})
