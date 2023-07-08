import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from "./screens/WelcomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegistroScreen from "./screens/RegistroScreen"

const Stack = createStackNavigator()
export default function Navigation(){
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName = "Welcome"
      >
        <Stack.Screen 
          name = "Welcome" 
          component={WelcomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name = "Home" 
          component={HomeScreen} 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name = "Login" 
          component={LoginScreen} 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name = "Registrarse" 
          component={RegistroScreen} 
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
