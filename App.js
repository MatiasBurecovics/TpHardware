import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeatherComponent from './WeatherComponent';
import BackgroundImage from './BackgroundImage';

export default function App() {
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <WeatherComponent />
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
