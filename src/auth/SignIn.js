import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import { authenticate } from '../actions'
import { fonts, colors } from '../theme'

import { Auth } from 'aws-amplify-react-native';
import { connect } from 'react-redux'

class SignIn extends Component<{}> {
  state = {
    username: '',
    password: '',
    email: ''
  }

  componentDidMount() {
    StatusBar.setHidden(true)
  }

  checkAuth() {
    Auth.currentSession()
      .then(data => {
        console.log('data: ', data)
        console.log('this will have a session if available')
      })
      .catch(err => {
        console.log('error:', err)
        console.log('this will fire if no session')
      })
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
    const { auth: { isAuthenticating, signInError }} = this.props
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
          Welcome back,
        </Text>
        <Text style={styles.greeting2}>
          sign in to continue
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
            placeholder="User Name"
            onChangeText={value => this.onChangeText('username', value)}
            underlineColorAndroid='transparent'
          />
          <TextInput
            autoCorrect={false}
            autoCapitalize='none'
            style={styles.input}
            placeholder="Password"
            onChangeText={value => this.onChangeText('password', value)}
            underlineColorAndroid='transparent'
            secureTextEntry
          />
        </View>

        <View>
          <TouchableOpacity onPress={this.signIn.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
              {
                isAuthenticating && (
                  <View style={styles.activityIndicator}><ActivityIndicator color={colors.primary} /></View>
                )
              }
            </View>
          </TouchableOpacity>
        </View>
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>Error logging in. Please try again.</Text>
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
    width: 32,
    height: 32
  },
  errorMessage: {
    fontFamily: fonts.base,
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  },
  activityIndicator: {
    transform: [{scale: 0.70}],
    marginTop: 3.5,
    marginLeft: 5
  },
  inputContainer: {
    marginTop: 20
  },
  button: {
    marginTop: 25,
    flexDirection: 'row'
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fonts.light,
    letterSpacing: 0.5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontFamily: fonts.light,
    fontSize: 20
  },
  greeting2: {
    fontFamily: fonts.light,
    color: '#666',
    fontSize: 20,
    marginTop: 5
  },
  input: {
    height: 45,
    marginBottom: 15,
    fontFamily: fonts.light,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary
  }
});
