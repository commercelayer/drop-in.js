// @ts-check

import React from 'react'

const getStorageKey = (name) => `drop-in.js__${name}`

export const settings = {
  clientId: () =>
    localStorage.getItem(getStorageKey('clientId')) ||
    'kuSKPbeKbU9LG9LjndzieKWRcfiXFuEfO0OYHXKH9J8',
  slug: () => localStorage.getItem(getStorageKey('slug')) || 'drop-in-js',
  scope: () => localStorage.getItem(getStorageKey('scope')) || 'market:11709',
  debug: () => localStorage.getItem(getStorageKey('debug')) || 'all'
}

const Input = ({ name }) => {
  const storageKey = `drop-in.js__${name}`
  const [value, setValue] = React.useState(settings[name])

  return React.createElement('section', undefined, [
    React.createElement('div', { key: `labelFor-${name}` }, name),
    React.createElement('input', {
      key: `input-${name}`,
      type: 'text',
      onChange: (/** @type React.FormEvent<HTMLInputElement> */ event) => {
        localStorage.setItem(storageKey, event.currentTarget.value)
        setValue(event.currentTarget.value)
      },
      value
    })
  ])
}

const ClientIdInput = () =>
  React.createElement(Input, {
    name: 'clientId'
  })

const SlugInput = () =>
  React.createElement(Input, {
    name: 'slug'
  })

const ScopeInput = () =>
  React.createElement(Input, {
    name: 'scope'
  })

const DebugInput = () =>
  React.createElement(Input, {
    name: 'debug'
  })

const ApplyButton = () =>
  React.createElement('input', {
    type: 'submit',
    value: 'Apply changes'
  })

const ResetButton = ({ style }) =>
  React.createElement(
    'button',
    {
      style,
      className: 'reset',
      onClick: () => {
        localStorage.removeItem(getStorageKey('clientId'))
        localStorage.removeItem(getStorageKey('slug'))
        localStorage.removeItem(getStorageKey('scope'))
        localStorage.removeItem(getStorageKey('debug'))
        location.reload()
      }
    },
    'Reset'
  )

export const OrganizationSettings = () => {
  return React.createElement(
    'form',
    {
      className: 'drop-in-js--organization-settings',
      onSubmit: (event) => {
        event.preventDefault()
        location.reload()
      }
    },
    [
      React.createElement(ClientIdInput, { key: 'clientIdInput' }),
      React.createElement(SlugInput, { key: 'slugInput' }),
      React.createElement(ScopeInput, { key: 'scopeInput' }),
      React.createElement(DebugInput, { key: 'debugInput' }),
      React.createElement(ApplyButton, { key: 'applyButton' }),
      React.createElement(ResetButton, {
        key: 'resetButton',
        style: {
          marginLeft: '10px'
        }
      })
    ]
  )
}
