import { MarkupIcon } from "@storybook/icons"
import React from "react"
import { IconButton } from "storybook/internal/components"
import { useGlobals, useStorybookApi } from "storybook/manager-api"
import {
  ADDON_ID,
  ADDON_TITLE,
  FILENAME,
  PARAM_KEY,
  TOOL_ID,
} from "./constants"

export const Tool = () => {
  const [globals, updateGlobals] = useGlobals()
  const active = globals[PARAM_KEY] === true || globals[PARAM_KEY] === "true"
  const api = useStorybookApi()

  const toggle = React.useCallback(
    () =>
      updateGlobals({
        [PARAM_KEY]: !active,
      }),
    [updateGlobals, active],
  )

  React.useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: `Toggle \`${FILENAME}\` [D]`,
      defaultShortcut: ["D"],
      actionName: FILENAME,
      showInMenu: false,
      action: toggle,
    })
  }, [toggle, api])

  return (
    <IconButton
      key={TOOL_ID}
      title={ADDON_TITLE}
      active={active}
      onClick={toggle}
    >
      <MarkupIcon /> {FILENAME}
    </IconButton>
  )
}
