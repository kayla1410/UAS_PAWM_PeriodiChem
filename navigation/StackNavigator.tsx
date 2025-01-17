import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import PeriodicTable from '../screens/PeriodicTable';
import SignIn from '../screens/SignIn'; 
import SignUp from '../screens/SignUp';
import LevelSelectionPage from '../screens/LevelSelectionPage'; 
import QuizPage from '../screens/QuizPage';
import Profile from '../screens/Profile';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  PeriodicTable: undefined; 
  LevelSelectionPage: undefined;
  QuizPage: { level: string };
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => (
  // <NavigationContainer>
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PeriodicTable" component={PeriodicTable} />
      <Stack.Screen
        name="LevelSelectionPage"
        component={LevelSelectionPage}
        options={{ title: 'Select Level' }}
      />
      <Stack.Screen
        name="QuizPage"
        component={QuizPage}
        options={({ route }) => ({ title: `Level ${route.params.level}` })}
      />
    </Stack.Navigator>
  // </NavigationContainer>
);

export default StackNavigator;
