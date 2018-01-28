import React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'

import { colors, fonts } from '../theme'

export default ({ placeholder, onChangeText, value }) => (
  <TextInput
    autoCapitalize='none'
    autoCorrect={false}
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#a0a0a0"
    onChangeText={value => onChangeText('username', value)}
    underlineColorAndroid='transparent'
  />
)

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginBottom: 15,
    fontFamily: fonts.light,
    borderBottomWidth: 1.5,
    fontSize: 16,
    borderBottomColor: colors.primary
  }
})
