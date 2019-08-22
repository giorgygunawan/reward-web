import React, { Component } from 'react'
import './style.css'
import CreateRewardForm from '../../components/organism/CreateRewardForm'

export default class Admin extends Component {
  async componentDidMount() {
    if(!this.props.isAuthenticated){
      alert('you are not logged in')
      this.props.history.push('/verify')
    }
  }

  render() {
    return (
      <div className="pages-admin-container">
        <CreateRewardForm/>
      </div>
    )
  }
}
