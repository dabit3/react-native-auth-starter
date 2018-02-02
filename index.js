import React from 'react'
import { AppRegistry } from 'react-native';
import App from './src/App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers'
import thunk from 'redux-thunk'
import config from './src/aws-exports'

const store = createStore(rootReducer, applyMiddleware(thunk))

import Amplify from 'aws-amplify'
Amplify.configure(config);

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('RNAmplifyExample', () => ReduxApp);
