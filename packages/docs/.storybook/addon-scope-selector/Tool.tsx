import { IconButton, Separator, WithTooltip, TooltipLinkList } from '@storybook/components'
import { BasketIcon, CheckIcon } from '@storybook/icons'
import React, { useCallback } from 'react'
import { SCOPES, PARAM_KEY, getSelectedScopeKey, ADDON_TITLE, TOOL_ID } from './constants'
import { styled, color } from "@storybook/theming"

const scopes = Object.keys(SCOPES) as (keyof typeof SCOPES)[]

type Scope = keyof typeof SCOPES

export const Tool = () => {
  const isActive = useCallback(
    (scope: Scope) => {
      return getSelectedScopeKey() === scope
    },
    []
  )

  return (
    <>
      <Separator />
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={() => (
          <TooltipLinkList
            links={scopes.map((scope) => ({
              id: scope,
              title: <LinkTitle active={isActive(scope)}>{scope}</LinkTitle>,
              right: <LinkIcon width={12} height={12} active={isActive(scope)} />,
              onClick: () => {
                localStorage.setItem(PARAM_KEY, scope)
                location.reload()
              },
              active: isActive(scope),
            }))}
          />
        )}
      >
        <IconButton
          key={TOOL_ID}
          title={ADDON_TITLE}
          active={scopes.some(isActive)}
        >
          <BasketIcon /> {getSelectedScopeKey()}
        </IconButton>
      </WithTooltip>
    </>
  )
}

const LinkTitle = styled.span<{ active?: boolean }>(({ active }) => ({
  color: active ? color.secondary : "inherit",
}))

const LinkIcon = styled(CheckIcon)<{ active?: boolean }>(({ active }) => ({
  opacity: active ? 1 : 0,
  path: { fill: active ? color.secondary : "inherit" },
}))
