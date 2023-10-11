import { StyleSheet, Text, View } from 'react-native';
import WeatherComponent from './WeatherComponent';

export default function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h1>Aplicación del Clima</h1>
    </header>
    <WeatherComponent />
 
  </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
