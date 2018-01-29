import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';

import { Auth } from 'aws-amplify-react-native';

export default class App extends Component<{}> {
  state = {
    username: '',
    password: '',
    email: ''
  }

  componentDidMount() {
    this.checkAuth()
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
    Auth.signIn(username, password)
      .then(user => {
        console.log('user: ', user)
      })
      .catch(err => {
        console.log('error: ', err)
      });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          placeholder="User Name"
          onChangeText={value => this.onChangeText('username', value)}
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize='none'
          style={styles.input}
          placeholder="Password"
          onChangeText={value => this.onChangeText('password', value)}
          secureTextEntry
        />

        <Button
          onPress={this.signIn.bind(this)}
          title='Sign In'
        />

        <Button
          onPress={this.checkAuth.bind(this)}
          title='Check Auth'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    backgroundColor: '#ededed',
    height: 45,
    marginBottom: 15,
    marginHorizontal: 10
  }
});
