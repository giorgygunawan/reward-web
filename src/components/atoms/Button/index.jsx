
import React, { Component } from 'react'
import classnames from 'classnames'

import './style.css'

export const Type = {
  BUTTON: 'button',
  RESET: 'reset',
  SUBMIT: 'submit',
}

export const Theme = {
  FILL: 'atoms-button-theme-fill',
  BORDER: 'atoms-button-theme-border',
  TEXT: 'atoms-button-theme-text'
}

export const Size = {
  SMALL: 'atoms-button-size-small',
  MEDIUM: 'atoms-button-size-medium',
  LARGE: 'atoms-button-size-large',
}

type Props = {
  type: string,
  theme: string,
  size: string,
  onClick: Function,
  children: React.Node,
  className: string,
  disabled: boolean,
}

const Button = (props: Props): Component => {
  const { type, onClick, children, theme, size, className, disabled } = props
  const classProps = classnames(
    "atoms-button",
    theme,
    size,
    {
      "disabled": disabled,
    },
    className
  )

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classProps}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: Type.BUTTON,
  theme: Theme.FILL,
  size: Size.SMALL,
  onClick: () => {},
  className: '',
  disabled: false,
}

export default Button
