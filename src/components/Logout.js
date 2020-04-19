import React, { Component } from 'react';

export default class Logout extends Component {
  constructor(props) {
    super()
  }

  componentDidMount () {
    this.props.handleLogout()
  }

  render () {
    return (
      <div>
        Logging Out    
      </div>
    )
  }
}