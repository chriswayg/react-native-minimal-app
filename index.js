import React from 'react';
import { AppRegistry, Text } from 'react-native';
import {name as appName} from './app.json';

const App = function() {
  return (
       <Text style={{fontSize: 32}}>Hello, World!</Text>
  );
}

AppRegistry.registerComponent(appName, () => App);
