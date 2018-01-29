import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import { authenticate } from '../actions'
import { fonts, colors } from '../theme'

import { connect } from 'react-redux'

import Input from '../components/Input'
import Button from '../components/Button'

import { Font } from 'expo'

class SignIn extends Component<{}> {
  state = {
    username: '',
    password: '',
    fontsLoaded: false
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
      'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf')
    });
    this.setState({ fontsLoaded: true })
  }
  
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signIn() {
    const { username, password } = this.state
    this.props.dispatchAuthenticate(username, password)
  }
  
  render() {
    const { fontsLoaded } = this.state
    const { auth: { isAuthenticating, signInError, signInErrorMessage }} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../assets/shape.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.greeting, fontsLoaded && { fontFamily: fonts.light }]}>
          Welcome back,
        </Text>
        <Text style={[styles.greeting2, fontsLoaded && { fontFamily: fonts.light }]}>
          sign in to continue
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="User Name"
            type='username'
            onChangeText={this.onChangeText}
            value={this.state.username}
          />
          <Input
            placeholder="Password"
            type='password'
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
          />
        </View>

        <Button
          isLoading={isAuthenticating}
          title='Sign In'
          onPress={this.signIn.bind(this)}
        />      
        <Text style={[styles.errorMessage, signInError && { color: 'black' }, fontsLoaded && { fontFamily: fonts.base }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signInError && { color: 'black' }, fontsLoaded && { fontFamily: fonts.base }]}>{signInErrorMessage}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchAuthenticate: (username, password) => authenticate(username, password)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5
  }
});
