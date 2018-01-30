import React from 'react'
import { AppRegistry } from 'react-native';
import App from './src/App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile);

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('RNAmplifyExample', () => ReduxApp);
