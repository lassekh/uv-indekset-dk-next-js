'use client'; // Ensure this runs as a Client Component

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getLocationData } from '@/lib/api';

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
        <title>UV-indeks i dag og 48 timer frem</title>
        <meta name="description" content={`UV-indeks lige nu: ${uvIndex} nær dig. Se det forventede UV-indeks i dag nær dig, nu og de næste 48 timer.`} />
      </Head>
      <h1>UV Indeks lige nu i {cityName}</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p className="uv-index">{uvIndex}</p>
          <p>
            Den nuværende teperatur er {currentWeather.temp}°C, med {currentWeather.humidity}% luftfugtighed, og vindhastigheden er {currentWeather.wind_speed} m/s i {cityName}. 
            UV indekset er lige nu {currentWeather.uvi >= 3 ? "over 3,0, så vi anbefaler at du bruger solcreme eller bliver i skyggen" : "under 3,0, så det er ikke nødvendigt at bruge solcreme, og du kan sikkert færdes i solen."}
          </p>
          <h2>UV indeks i dag og de næste 48 timer</h2>
          <p>
            Hvis du har brug for at kende UV-indekset frem i tiden, f.eks. det forventet UV-indeks resten af dagen eller i morgen,
            så kan du her se hvor høj ultra violet stråling der er forventet hver time de næste 48 timer. 
          </p>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Indeks</th>
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
      <h2>Hvad er UV-indeks?</h2>
      <p>
        UV betyder <b>U</b>ltra <b>V</b>iolet, og UV-indekset siger noget om hvor kraftig en Ultra Violet stråling der kommer fra solen.
        Med andre ord, er det en måde at kvantificere data om solens stråling, så vi ved om vi skal beskytte os mod den med solcreme eller ej.
      </p>
      <h3>UV-indeks skala</h3>
      <table>
        <thead>
          <tr>
            <th>UV-Indeks</th>
            <th>Stråling intensitet</th>
            <th>Beskyttelse nødvendig</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt; 3</td>
            <td>Lav</td>
            <td>Nej</td>
          </tr>
          <tr>
            <td>3-6</td>
            <td>Moderat</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>6-8</td>
            <td>Høj</td>
            <td>Ja</td>
          </tr>
          <tr>
            <td>8-10</td>
            <td>Meget høj</td>
            <td>Ja, mere</td>
          </tr>
          <tr>
            <td>&lt; 10</td>
            <td>Ekstrem</td>
            <td>Ja, ekstra</td>
          </tr>
        </tbody>
      </table>
      <p>
        Denne tabel er skabt ud fra DMIs artikel om UV-indeks.
        Kilde: <a href="https://www.dmi.dk/vejr-og-atmosfare/temaforside-ozonlaget-og-uv-straling/uv-indeks">https://www.dmi.dk/vejr-og-atmosfare/temaforside-ozonlaget-og-uv-straling/uv-indeks</a>
      </p>
    </>
  );
}
