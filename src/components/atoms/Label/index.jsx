
import React, { Component } from 'react'
import classnames from 'classnames'

import './style.css'

export const Level = {
  H1: 'atoms-label-level-h1',
  H2: 'atoms-label-level-h2',
  H2_BOLD: 'atoms-label-level-h2-bold',
  BODY: 'atoms-label-level-body',
  BODY_BOLD: 'atoms-label-level-body-bold',
  CAPTION: 'atoms-label-level-caption',
  CAPTION_BOLD: 'atoms-label-level-caption-bold'
}

export const Color = {
  PRIMARY: 'atoms-label-color-primary',
  SECONDARY: 'atoms-label-color-secondary',
  TERTIARY: 'atoms-label-color-tertiary',
  WHITE: 'atoms-label-color-white',
  BLACK: 'atoms-label-color-black',
  GREY: 'atoms-label-color-grey'
}

type Props = {
  level: string,
  color: string,
  children: React.Node,
  className: string,
}

const Label = (props: Props): Component => {
  const { children, level, color, className } = props
  const classProps = classnames(
    "atoms-label",
    color,
    level,
    className
  )

  return (
    <span className={classProps}>
      {children}
    </span>
  )
}

Label.defaultProps = {
  level: Level.BODY,
  color: Color.BLACK,
  className: ''
}

export default Label
