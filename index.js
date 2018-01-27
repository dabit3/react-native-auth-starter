import React from 'react'
import { AppRegistry } from 'react-native';
import App from './src/App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

import Amplify from 'aws-amplify-react-native'

Amplify.configure({
  Auth: {
      identityPoolId: 'us-east-1:249b833a-8a98-4bdf-878d-802b6d72f34b', //REQUIRED - Amazon Cognito Identity Pool ID
      region: 'us-east-1', // REQUIRED - Amazon Cognito Region
      userPoolId: 'us-east-1_iWmAqwo3B', //OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: 'm27ocd7vddvhounlej6kli7nh',
  }
});

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('RNAmplifyExample', () => ReduxApp);
