import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NroEmergencia from './NroEmergencia';
import BackgroundImage from './BackgroundImage'
import WeatherComponent from './WeatherComponent'
import AboutScan from './AboutScan';
import Home from './Home';

const Stack = createNativeStackNavigator();

function Main ()  {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {headerShown:false}
           }>
             <Stack.Screen
          name="Home"
          component={Home}
        /> 
        <Stack.Screen
          name="NroEmergencia"
          component={NroEmergencia}
        /> 
        <Stack.Screen
          name="BackgroundImage"
          component={BackgroundImage}
        /> 
        <Stack.Screen
          name="WeatherComponent"
          component={WeatherComponent}
        />
            <Stack.Screen
          name="AboutScan"
          component={AboutScan}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main