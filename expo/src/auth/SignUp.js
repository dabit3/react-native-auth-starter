import React, { Component } from 'react'
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

import { Auth } from 'aws-amplify-react-native'
import { connect } from 'react-redux'
import { Font } from 'expo'

import { fonts, colors } from '../theme'
import { createUser } from '../actions'

import Input from '../components/Input'
import Button from '../components/Button'

class SignUp extends Component<{}> {
  state = {
    username: '',
    password: '',
    email: '',
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

  signUp() {
    const { username, password, email } = this.state
    this.props.dispatchCreateUser(username, password, email)
  }
  
  render() {
    const { auth: { isAuthenticating, signUpError }} = this.props
    const { fontsLoaded } = this.state
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
          Welcome,
        </Text>
        <Text style={[styles.greeting2, fontsLoaded && { fontFamily: fonts.light }]}>
          sign up to continue
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="User Name"
            type='username'
            onChangeText={this.onChangeText}
          />
          <Input
            placeholder="Email"
            type='email'
            onChangeText={this.onChangeText}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
          />
        </View>
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
          isLoading={isAuthenticating}
        />
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }, fontsLoaded && { fontFamily: fonts.base }]}>Error logging in. Please try again.</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchCreateUser: (username, password, email) => createUser(username, password, email)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
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
  },
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
  }
});
