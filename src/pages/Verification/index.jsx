import React, { Component } from 'react'

import './style.css'
import SignInForm from '../../components/organism/SignInForm'

export default class Verification extends Component {
  userSignedIn = () => {
    this.props.userHasAuthenticated(true);
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="pages-verification-container">
        <SignInForm userSignedIn={() => {this.userSignedIn()}}/>
      </div>
    )
  }
}
