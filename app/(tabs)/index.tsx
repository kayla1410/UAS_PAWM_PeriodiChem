import 'react-native-gesture-handler';
import React from 'react';
// import { View, Text } from 'react-native';
import { registerRootComponent } from 'expo';
import StackNavigator from '../../navigation/StackNavigator';

const App = () => {
  return <StackNavigator />;
};

registerRootComponent(App);

// const Tabs = () => {
//   return (
//     <View>
//       <Text>Tabs Component</Text>
//     </View>
//   );
// };

export default App;