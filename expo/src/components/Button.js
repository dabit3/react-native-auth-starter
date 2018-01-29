import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Font } from 'expo'

import { fonts, colors } from '../theme'

export default class Button extends React.Component {
  state = {
    fontsLoaded: false
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
      'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf')
    });
    this.setState({ fontsLoaded: true })
  }
  render() {
    const { title, onPress, isLoading } = this.props
    const { fontsLoaded } = this.state
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={[styles.buttonText, fontsLoaded && { fontFamily: fonts.light }]}>{title}</Text>
          {
            isLoading && (
              <View style={styles.activityIndicator}>
                <ActivityIndicator color={colors.primary} />
              </View>
            )
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    flexDirection: 'row'
  },
  buttonText: {
    color: colors.primary,
    fontSize: 22,
    letterSpacing: 0.5
  },
  activityIndicator: {
    transform: [{scale: 0.70}],
    marginTop: 3.5,
    marginLeft: 5
  }
})