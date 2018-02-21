import React from 'react'
import { StatusBar } from 'react-native'

import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import Tabs from './auth/Tabs'
import Nav from './nav/Nav'

class App extends React.Component {
  componentDidMount() {
    StatusBar.setHidden(true)
  }
  render() {
    let loggedIn = false
    if (Auth.user) {
      const { user: { signInUserSession: { accessToken: { payload: { exp, iat }}}}} = Auth
      if (iat < exp) loggedIn = true
    }
    if (loggedIn) {
      return (
        <Nav />
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
