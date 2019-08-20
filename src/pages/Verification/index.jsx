import React, { Component } from 'react'

import './style.css'
import SignInForm from '../../components/organism/SignInForm'
export default class Verification extends Component {
  render() {
    return (
      <div className="pages-details-container">
        <SignInForm/>
      </div>
    )
  }
}
