import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

function WeatherComponent({ backgroundImage }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        const apiKey = '531e953f71c1c38732467c375145a095';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${apiKey}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      });
    }
  }, []);

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Thunderstorm':
        return require('./animated/thunder.svg');
      case 'Drizzle':
        return require('./animated/rainy-2.svg');
      case 'Rain':
        return require('./animated/rainy-7.svg');
      case 'Snow':
        return require('./animated/snowy-6.svg');
      case 'Clear':
        return require('./animated/day.svg');
      case 'Atmosphere':
        return require('./animated/weather.svg');
      case 'Clouds':
        return require('./animated/cloudy-day-1.svg');
      default:
        return require('./animated/cloudy-day-1.svg');
    }
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImageContainer}
    >
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <View style={styles.weatherContainer}>
            <View style={styles.box1}>
              <Text style={styles.temperature}>{Math.round(data.main.temp)} ° C</Text>
              <Text style={styles.description}>{data.weather[0].description.toUpperCase()}</Text>
            </View>
            <View style={styles.box2}>
              <Text style={styles.location}>{data.name}</Text>
              <Image source={getWeatherIcon(data.weather[0].main)} style={styles.weatherIcon} />
            </View>
            <View style={styles.box3}>
              <Text style={styles.wind}>Velocidad del Viento</Text>
              <Text style={styles.windSpeed}>{data.wind.speed} m/s</Text>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box1: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 36,
    color: 'black',
  },
  description: {
    fontSize: 18,
    color: 'black',
  },
  box2: {
    alignItems: 'center',
  },
  location: {
    fontSize: 24,
    color: 'black',
  },
  weatherIcon: {
    height: 128,
    width: 128,
  },
  box3: {
    alignItems: 'center',
  },
  wind: {
    fontSize: 18,
    color: 'black',
  },
  windSpeed: {
    fontSize: 18,
    color: 'black',
  },
});

export default WeatherComponent;
