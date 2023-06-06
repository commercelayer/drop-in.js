import React from 'react'

/*
<div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
  <p className="!m-0 font-bold">Info</p>
  <p className="!m-0 ">The pre-filled code refers to an available product, try to change it with an out-of-stock (e.g. <code>{codes.outOfStock}</code>) and see how the component behaves in the example above.</p>
</div> 
*/
interface Props {
  title: string
  type: 'info' | 'danger' | 'warning' | 'success'
  children: React.ReactNode
}

export const Alert: React.FC<Props> = ({ title, type = 'info', children }) => {
  const color =
    type === 'danger'
      ? 'bg-red-100 border-red-500 text-red-700'
      : type === 'success'
      ? 'bg-green-100 border-green-500 text-green-700'
      : type === 'warning'
      ? 'bg-orange-100 border-orange-500 text-orange-700'
      : 'bg-blue-100 border-blue-500 text-blue-700'

  const titleElement = React.createElement('p', {
    className: '!m-0 font-bold',
    children: title
  })

  const contentElement = React.createElement('div', {
    className: '[&>p]:!m-0',
    children
  })

  return React.createElement('div', {
    role: 'alert',
    className: `border-l-4 p-4 ${color}`,
    children: [titleElement, contentElement]
  })
}
