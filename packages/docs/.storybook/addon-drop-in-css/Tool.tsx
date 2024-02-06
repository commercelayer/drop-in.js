import { useGlobals, useStorybookApi } from '@storybook/api'
import { IconButton, Icons } from '@storybook/components'
import React, { useCallback, useEffect } from 'react'
import { ADDON_ID, ADDON_TITLE, FILENAME, PARAM_KEY, TOOL_ID } from './constants'

export const Tool = () => {
  const [globals, updateGlobals] = useGlobals()
  const active = globals[PARAM_KEY] === true || globals[PARAM_KEY] === 'true'
  const api = useStorybookApi()

  const toggle = useCallback(
    () =>
      updateGlobals({
        [PARAM_KEY]: !active,
      }),
    [updateGlobals, active]
  )

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: `Toggle \`${FILENAME}\` [D]`,
      defaultShortcut: ['D'],
      actionName: FILENAME,
      showInMenu: false,
      action: toggle,
    })
  }, [toggle, api])

  return (
    <IconButton
      autoFocus={null}
      rev={null}
      content={null}
      nonce={null}
      rel={null}
      key={TOOL_ID}
      title={ADDON_TITLE}
      active={active}
      onClick={toggle}
    >
      <Icons icon="markup" />
      &nbsp;&nbsp;{FILENAME}
    </IconButton>
  )
}
