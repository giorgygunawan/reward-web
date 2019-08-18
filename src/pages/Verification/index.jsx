import React, { Component } from 'react'

import './style.css'
import SignInForm from '../../components/organism/SignInForm'
import StickyButton from '../../components/organism/StickyButton'
export default class Verification extends Component {
  render() {
    return (
      <div className="pages-details-container">
        <SignInForm/>
      </div>
    )
  }
}
