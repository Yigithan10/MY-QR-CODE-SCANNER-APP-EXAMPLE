import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './src/screens/Splash';
import MyCamera from './src/screens/MyCamera';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash">
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='MyCamera' component={MyCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;