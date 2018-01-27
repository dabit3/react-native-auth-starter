import React from 'react'

import Tabs from './auth/Tabs'
import Nav from './nav/Nav'

import { connect } from 'react-redux'

class App extends React.Component {
  checkAuth() {
    console.log('navigation state change')
    Auth.currentSession()
      .then(data => {
        console.log('data: ', data)
      })
      .catch(err => {
        console.log('error:', err)
      })
  }
  render() {
    const { loggedIn } = this.props.auth
    if (loggedIn) {
      return (
        <Nav
          onNavigationStateChange={this.checkAuth.bind(this)}
        />
      )
    }
    return (
      <Tabs />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)
