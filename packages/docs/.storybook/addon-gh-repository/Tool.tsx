import { A, IconButton, Separator } from "@storybook/components"
import { GithubIcon } from "@storybook/icons"
import React from "react"
import { ADDON_NAME, REPOSITORY_URL, TOOL_ID } from "./constants"

export const Tool = () => {
  return (
    <>
      <Separator />
      <IconButton
        key={TOOL_ID}
        title={ADDON_NAME}
        active={false}
        onClick={() => {
          window.open(REPOSITORY_URL, "_blank")
        }}
      >
        <GithubIcon /> repository
      </IconButton>
    </>
  )
}
