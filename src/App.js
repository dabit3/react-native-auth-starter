import React from 'react'
import { StatusBar } from 'react-native'

import { connect } from 'react-redux'
import { Auth } from 'aws-amplify-react-native'

import Tabs from './auth/Tabs'
import Nav from './nav/Nav'

class App extends React.Component {
  componentDidMount() {
    StatusBar.setHidden(true)
  }
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
