import React, { Component } from 'react'

import './style.css'

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="notFoundContainer">
          <div className="header">Page not found</div>
          <div className="subheader">Sometimes what you search is not what you find.</div>
        </div>
      </div>
    )
  }
}
