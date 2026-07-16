import { GithubIcon } from "@storybook/icons"
// biome-ignore lint/correctness/noUnusedImports: React is used in the render method
import React from "react"
import { Separator, ToggleButton } from "storybook/internal/components"
import { ADDON_NAME, REPOSITORY_URL, TOOL_ID } from "./constants"

export const Tool = () => {
  return (
    <>
      <Separator />
      <ToggleButton
        key={TOOL_ID}
        title={ADDON_NAME}
        pressed={false}
        active={false}
        onClick={() => {
          window.open(REPOSITORY_URL, "_blank")
        }}
      >
        <GithubIcon /> repository
      </ToggleButton>
    </>
  )
}
