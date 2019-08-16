import React, { Component } from 'react'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'

import './style.css'

type Props = {
  className: string,
}

const NavigationBar = (props: Props): Component => {
  const { className } = props
  const classProps = classnames(
    "organism-navigation-bar",
    className
  )
  return (
    <div className={classProps}>
      <Label className="organism-navigation-bar-title" level={LabelLevel.H2_BOLD} color={LabelColor.PRIMARY}> ASTRO REWARDS </Label>
    </div>
  )
}

NavigationBar.defaultProps = {
  className: ''
}

export default NavigationBar
