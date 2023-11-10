import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NroEmergencia from './NroEmergencia';
import BackgroundImage from './BackgroundImage';
import WeatherComponent from './WeatherComponent';
import AboutScan from './AboutScan';
import Home from './Home';

const Stack = createNativeStackNavigator();

function Main() {
  const [backgroundImage, setBackgroundImage] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} backgroundImage={backgroundImage} />}
        </Stack.Screen>
        <Stack.Screen
          name="BackgroundImage"
          options={{
            headerShown: true,
            title: 'Elegir fondo',
          }}
        >
          {(props) => (
            <BackgroundImage
              {...props}
              onImageChange={(uri) => setBackgroundImage(uri)}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="NroEmergencia"
          options={{
            headerShown: true,
            title: 'Config Telefono Emergencia',
          }}
        >
          {(props) => <NroEmergencia {...props} backgroundImage={backgroundImage} />}
        </Stack.Screen>
        <Stack.Screen
          name="WeatherComponent"
          options={{
            headerShown: true,
            title: 'Clima',
          }}
        >
          {(props) => <WeatherComponent {...props} backgroundImage={backgroundImage} />}
        </Stack.Screen>
        <Stack.Screen
          name="AboutScan"
          options={{
            headerShown: true,
            title: 'About Us',
          }}
        >
          {(props) => <AboutScan {...props} backgroundImage={backgroundImage} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;





