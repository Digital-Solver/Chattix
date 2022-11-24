// Dependencies
import {StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Modules
import Chat from './components/Chat';
import Start from './components/Start';

// Navigator
const Stack = createStackNavigator();

// App - Main Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Start">

        <Stack.Screen
          name="Start"
          component={Start}/>
          
        <Stack.Screen
          name="Chat"
          component={Chat}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styling
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 25,
  }
});
