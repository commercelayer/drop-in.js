import { A, IconButton, Separator } from '@storybook/components'
import { BoxIcon } from '@storybook/icons'
import React from 'react'
import { ADDON_NAME, LINK_URL, TOOL_ID } from './constants'

export const Tool = () => {
  return (
    <>
      <Separator />
      <IconButton
        key={TOOL_ID}
        title={ADDON_NAME}
        active={false}
        onClick={() => {
          window.open(LINK_URL, '_blank')
        }}
      >
        {/* DO NOT REMOVE - replace version */}v2.11.0
      </IconButton>
    </>
  )
}
