import React, { Component } from 'react';
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

import { fonts, colors } from '../theme'
import { createUser } from '../actions'

import Input from '../components/Input'
import Button from '../components/Button'

class SignUp extends Component<{}> {
  state = {
    username: '',
    password: '',
    email: ''
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
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../assets/shape.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.greeting}>
          Welcome,
        </Text>
        <Text style={styles.greeting2}>
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
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
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
    fontFamily: fonts.light,
    fontSize: 24
  },
  greeting2: {
    fontFamily: fonts.light,
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
    fontFamily: fonts.base,
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  }
});
