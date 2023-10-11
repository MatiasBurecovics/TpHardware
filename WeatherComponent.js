import React, { useEffect, useState } from 'react';

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

    if (isLoading) return <div>Cargando...</div>;

    const getWeatherIcon = main => {
        switch (main) {
            case 'Thunderstorm': return 'animated/thunder.svg';
            case 'Drizzle': return 'animated/rainy-2.svg';
            case 'Rain': return 'animated/rainy-7.svg';
            case 'Snow': return 'animated/snowy-6.svg';
            case 'Clear': return 'animated/day.svg';
            case 'Atmosphere': return 'animated/weather.svg';
            case 'Clouds': return 'animated/cloudy-day-1.svg';
            default: return 'animated/cloudy-day-1.svg';
        }
    }

    return (
        <div id="contenedor">
            <div id="caja1">
                <h1>{Math.round(data.main.temp)} ° C</h1>
                <h1>{data.weather[0].description.toUpperCase()}</h1>
            </div>
            <div id="caja2">
                <h2>{data.name}</h2>
                <img id="icono-animado" src={getWeatherIcon(data.weather[0].main)} alt="Icono del Clima" height="128" width="128" />
            </div>
            <div id="caja3">
                <h3>Veloc. del Viento</h3>
                <h1>{data.wind.speed} m/s</h1>
            </div>
        </div>
    );
}

export default WeatherComponent;
