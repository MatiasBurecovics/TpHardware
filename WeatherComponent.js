import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

function WeatherComponent() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;
                const apiKey = '531e953f71c1c38732467c375145a095';
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${apiKey}`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        setData(data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error(error);
                        setIsLoading(false);

                    });
            });
        }
    }, []);

    const getWeatherIcon = main => {
        switch (main) {
            case 'Thunderstorm': return require('./animated/thunder.svg');
            case 'Drizzle': return require('./animated/rainy-2.svg');
            case 'Rain': return require('./animated/rainy-7.svg');
            case 'Snow': return require('./animated/snowy-6.svg');
            case 'Clear': return require('./animated/day.svg');
            case 'Atmosphere': return require('./animated/weather.svg');
            case 'Clouds': return require('./animated/cloudy-day-1.svg');
            default: return require('./animated/cloudy-day-1.svg');
        }
    }

    return (
        <>
        {
            isLoading ? (<View><Text>Cargando...</Text></View>):
(
        <View id="contenedor">
            <View id="caja1">
                <Text>{Math.round(data.main.temp)} ° C</Text>
                <Text>{data.weather[0].description.toUpperCase()}</Text>
            </View>
            <View id="caja2">
                <Text>{data.name}</Text>
                <Image source={getWeatherIcon(data.weather[0].main)} style={{ height: 128, width: 128 }} />
            </View>
            <View id="caja3">
                <Text>Velocidad del Viento</Text>
                <Text>{data.wind.speed} m/s</Text>
            </View>
        </View>
    )}
    </>
    );
        
}

export default WeatherComponent;
