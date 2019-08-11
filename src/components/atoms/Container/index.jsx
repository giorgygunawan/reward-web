
import React, { Component } from 'react'
import classnames from 'classnames'

import './style.css'

export const Theme = {
  FILL: 'atoms-container-theme-fill',
  BORDER: 'atoms-container-theme-border',
}

export const Size = {
  SMALL: 'atoms-container-size-small',
  MEDIUM: 'atoms-container-size-medium',
  LARGE: 'atoms-container-size-large',
}

type Props = {
  theme: string,
  size: string,
  onClick: Function,
  children: React.Node,
  className: string,
  disabled: boolean,
}

const Container = (props: Props): Component => {
  const { onClick, children, theme, size, className } = props
  const classProps = classnames(
    "atoms-container",
    theme,
    size,
    className
  )

  return (
    <div onClick={onClick} className={classProps}>
      {children}
    </div>
  )
}

Container.defaultProps = {
  theme: Theme.FILL,
  size: Size.SMALL,
  onClick: () => {},
  className: ''
}

export default Container
