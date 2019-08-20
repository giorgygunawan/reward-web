import React, { Component } from 'react'
import {withRouter} from 'react-router'
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Button, { Theme } from '../../atoms/Button'

import './style.css'

type Props = {
  className: string,
  isAuthenticated: boolean,
  handleLogout: Function
}

const NavigationBar = (props: Props): Component => {
  const { className, isAuthenticated, handleLogout } = props
  const classProps = classnames(
    "organism-navigation-bar",
    className
  )
  return (
    <div className={classProps}>
      <Label className="organism-navigation-bar-title" level={LabelLevel.H2_BOLD} color={LabelColor.PRIMARY}> REWARDS </Label>
      <div className="empty-space"></div>
      { isAuthenticated &&
        <Button theme={Theme.TEXT} onClick={(handleLogout)}>
          <Label className="organism-navigation-bar-title" level={LabelLevel.BODY_BOLD} color={LabelColor.PRIMARY}>
            LOG OUT
          </Label>
        </Button>
    }
    </div>
  )
}

NavigationBar.defaultProps = {
  className: ''
}

export default NavigationBar
