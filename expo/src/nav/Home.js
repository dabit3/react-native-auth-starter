import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Animated,
  Dimensions
} from 'react-native'

import { connect } from 'react-redux'
import { Font } from 'expo'

import { colors, fonts } from '../theme'
const { width, height } = Dimensions.get('window')

class Home extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    fontsLoaded: false
  }
  AnimatedScale = new Animated.Value(1)
  async componentDidMount() {
    this.animate()
    await Font.loadAsync({
      'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
      'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf')
    });
    this.setState({ fontsLoaded: true })
  }
  navigate() {
    this.props.navigation.navigate('Route1')
  }
  animate() {
    Animated.timing(
      this.AnimatedScale,
      {
        toValue: .8,
        duration: 1250,
        useNativeDriver: true
      }
    ).start(() => {
      Animated.timing(
        this.AnimatedScale,
        {
          toValue: 1,
          duration: 1250,
          useNativeDriver: true
        }
      ).start(() => this.animate())
    })
  }
  render() {
    const { userConfirmed } = this.props
    const { fontsLoaded } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={[styles.welcome, fontsLoaded && { fontFamily: fonts.light }]}>Welcome</Text>
          <Animated.Image
            source={require('../assets/boomboxcropped.png')}
            style={{ tintColor: colors.primary, width: width / 2, height: width / 2, transform: [{scale: this.AnimatedScale}]}}
            resizeMode='contain'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  homeContainer: {
    alignItems: 'center'
  },
  welcome: {
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: 26,
    fontSize: 22,
    textAlign: 'center'
  },
  registration: {
    color: 'rgba(0, 0, 0, .5)',
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Home)