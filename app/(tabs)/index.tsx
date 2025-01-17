import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import StackNavigator from '../../navigation/StackNavigator';

const App = () => {
  return <StackNavigator />;
};

registerRootComponent(App);
