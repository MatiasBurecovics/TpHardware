import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import WeatherComponent from './WeatherComponent';
import BackgroundImage from './BackgroundImage';

export default function App() {
  const [showWeather, setShowWeather] = useState(true);

  const toggleComponent = () => {
    setShowWeather(!showWeather);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Elegi la funcion</Text>
      </View>
      {showWeather ? <WeatherComponent /> : <BackgroundImage />}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleComponent}>
        <Text style={styles.buttonText}>
          {showWeather ? 'Ver Fondo de Pantalla' : 'Ver Clima'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
