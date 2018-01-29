import React from 'react'
import { StackNavigator } from 'react-navigation'

import Home from './Home'
import Route1 from './Route1'

const routeConfig = {
  Home: { screen: Home },
  Route1: { screen: Route1 }
}

const StackNav = StackNavigator(routeConfig)

class Nav extends React.Component {
  render() {
    return (
      <StackNav />
    )
  }
}

export default StackNav
