
import React, { Component } from 'react'
import classnames from 'classnames'

import './style.css'

export const ButtonType = {
  BUTTON: 'button',
  RESET: 'reset',
  SUBMIT: 'submit',
}

export const ButtonTheme = {
  FILL: 'atoms-button-theme-fill',
  BORDER: 'atoms-button-theme-border',
  TEXT: 'atoms-button-theme-text'
}

export const ButtonSize = {
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
  type: ButtonType.BUTTON,
  theme: ButtonTheme.FILL,
  size: ButtonSize.SMALL,
  onClick: () => {},
  className: '',
  disabled: false,
}

export default Button
