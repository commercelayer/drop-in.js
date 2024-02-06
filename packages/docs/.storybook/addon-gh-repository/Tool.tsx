import { A, IconButton, Icons, Separator } from '@storybook/components'
import React from 'react'
import { ADDON_NAME, REPOSITORY_URL, TOOL_ID } from './constants'

export const Tool = () => {
  return (
    <>
      <Separator />
      <IconButton
        autoFocus={null}
        rev={null}
        content={null}
        nonce={null}
        rel={null}
        key={TOOL_ID}
        title={ADDON_NAME}
        active={false}
      >
        
        <A target='_blank' href={REPOSITORY_URL}>
          <Icons icon="github" />&nbsp;&nbsp;repository
        </A>
      </IconButton>
    </>
  )
}
