'use client'; // Ensure this runs as a Client Component

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getLocationData, getWeatherData } from '@/lib/api';

export default function HomePage() {
  const [error, setError] = useState(null);
  const [uvIndex, setUvIndex] = useState('');
  const [currentWeather, setCurrentWeather] = useState('');
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("Geolocation access granted");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherData(latitude, longitude);
          await fetchLocationData(longitude, latitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            default:
              setError("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const weatherData = await res.json()
      setCurrentWeather(weatherData.current);
      setHourlyWeather(weatherData.hourly);
      setUvIndex(weatherData.current.uvi);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLocationData = async (lon, lat) => {
    const data = await getLocationData(lon, lat);
    setCityName(data.navn);
    return data;
  };

  return (
    <>
      <Head>
        <title>UV Index Now and Next 48 Hours</title>
        <meta name="description" content={`UV Index right now: ${uvIndex}. Check the expected UV index for today and the next 48 hours.`} />
      </Head>
      <h1>UV Index Right Now in {cityName}</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p className="uv-index">{uvIndex}</p>
          <p>
            The current temperature is {currentWeather.temp}°C, with {currentWeather.humidity}% humidity, and wind speed is {currentWeather.wind_speed} m/s in {cityName}. 
            The UV index is currently {currentWeather.uvi >= 3 ? "above 3.0, so we recommend using sunscreen or staying in the shade" : "below 3.0, so no need for sunscreen, and you can stay in the sun safely."}
          </p>
          <h2>UV Index for Today and the Next 48 Hours</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Index</th>
              </tr>
            </thead>
            <tbody>
              {hourlyWeather.map((hour, index) => {
                const currentHour = new Date(hour.dt * 1000).getHours();
                return (
                  <tr key={index}>
                    <td>{currentHour}-{currentHour + 1}</td>
                    <td>{hour.uvi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
