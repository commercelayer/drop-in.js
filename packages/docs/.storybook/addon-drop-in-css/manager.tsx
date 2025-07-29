import { addons, types } from "@storybook/manager-api"
// biome-ignore lint/correctness/noUnusedImports: React is used in the render method
import React from "react"
import { ADDON_ID, ADDON_TITLE } from "./constants"
import { Tool } from "./Tool"

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: ADDON_TITLE,
    type: types.TOOL,
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: () => <Tool />,
  })
})
