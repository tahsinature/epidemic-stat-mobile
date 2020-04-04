/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import App from './App';
import store from './src/store';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
));
