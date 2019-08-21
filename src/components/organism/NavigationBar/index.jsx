import React, { Component } from 'react'
import {withRouter} from 'react-router'
import { Auth } from "aws-amplify"
import classnames from 'classnames'
import Label, { Level as LabelLevel, Color as LabelColor } from '../../atoms/Label'
import Button, { Theme } from '../../atoms/Button'

import './style.css'

type Props = {
  className: string,
  isAuthenticated: boolean,
  userHasAuthenticated: Function
}

const handleLogout = async (history, userHasAuthenticated) => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('/');
}

const handleLogin = (history) => {
    history.push('/verify');
}

const goToHome = (history) => {
    history.push('/');
}

const NavigationBar = (props: Props): Component => {
  const { className, isAuthenticated, history, location, userHasAuthenticated } = props
  const classProps = classnames(
    "organism-navigation-bar",
    className
  )
  return (
    <div className={classProps}>
      <Button theme={Theme.TEXT} onClick={() => {goToHome(history)}}>
        <Label className="organism-navigation-bar-title" level={LabelLevel.H2_BOLD} color={LabelColor.PRIMARY}> REWARDS </Label>
      </Button>
      <div className="empty-space"></div>
      { isAuthenticated ?
        <Button theme={Theme.TEXT} onClick={() => {handleLogout(history, userHasAuthenticated)}}>
          <Label className="organism-navigation-bar-title" level={LabelLevel.BODY_BOLD} color={LabelColor.PRIMARY}>
            LOG OUT
          </Label>
        </Button> :
        location.pathname !== '/verify' && <Button theme={Theme.TEXT} onClick={() => {handleLogin(history)}}>
          <Label className="organism-navigation-bar-title" level={LabelLevel.BODY_BOLD} color={LabelColor.PRIMARY}>
            LOG IN
          </Label>
        </Button>
    }
    </div>
  )
}

NavigationBar.defaultProps = {
  className: ''
}

export default withRouter(NavigationBar)
