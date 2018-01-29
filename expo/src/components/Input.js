import React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'
import { Font } from 'expo'

import { colors, fonts } from '../theme'

export default class Input extends React.Component {
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
    const { fontsLoaded } = this.state
    const { onChangeText, placeholder, type, ...props } = this.props
    return (
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        style={[styles.input, fontsLoaded && { fontFamily: fonts.light }]}
        placeholder={placeholder}
        placeholderTextColor="#a0a0a0"
        onChangeText={value => onChangeText(type, value)}
        underlineColorAndroid='transparent'
        {...props}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginBottom: 15,
    borderBottomWidth: 1.5,
    fontSize: 16,
    borderBottomColor: colors.primary
  }
})
