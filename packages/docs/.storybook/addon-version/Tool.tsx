// biome-ignore lint/correctness/noUnusedImports: React is used in the render method
import React from "react"
import { Separator, ToggleButton } from "storybook/internal/components"
import { ADDON_NAME, LINK_URL, TOOL_ID } from "./constants"

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
          window.open(LINK_URL, "_blank")
        }}
      >
        {/* DO NOT REMOVE - replace version */}v2.26.2
      </ToggleButton>
    </>
  )
}
