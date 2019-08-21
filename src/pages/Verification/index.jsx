import React, { Component } from 'react'

import './style.css'
import SignInForm from '../../components/organism/SignInForm'

export default class Verification extends Component {
  userSignedIn = () => {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="pages-details-container">
        <SignInForm userHasAuthenticated={this.props.userHasAuthenticated} userSignedIn={() => {this.userSignedIn()}}/>
      </div>
    )
  }
}
