import { NextResponse } from "next/server";

const OWM_GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0/zip';
const OWM_DATA_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const API_KEY = process.env.OWM_API;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  
  const res = await fetch(`${OWM_DATA_BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`);
  const data = await res.json();
  return NextResponse.json(data);
}

// async function getGeoData(zip) {
//     const res = await fetch(`${OWM_GEO_BASE_URL}?zip=${zip},DK&units=metric&appid=${API_KEY}`);
//     // Check if latitude and longitude are provided
//     if (!res.ok) {
//         throw new Error('Failed to fetch lat/long from Geo API');
//     }
  
//     return {lat, lon} = await res.json();
//     // return {
//     //   lat: geoData.lat,
//     //   lon: geoData.lon,
//     // };
// }

// async function getWeatherData(lat, lon) {
//     const res = await fetch(`${OWM_DATA_BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely,daily&units=metric&appid=${API_KEY}`);

//     if(!res.ok) {
//         throw new Error('Failed to fetch weather data based on lat and lon');
//     }

//     const weatherData = await res.json();
//     return weatherData;
// }

// export async function GET(request) {
//     const { searchParams } = new URL(request.url);
//     const zip = searchParams.get('zip');  // Get zip code from query params
  
//     try {
//       // First, fetch the lat/long using the zip code
//       const { lat, lon } = await getGeoData(zip);
  
//       // Then, use the lat/long to fetch weather/UV data
//       const weatherData = await getWeatherData(lat, lon);
  
//       // Return the weather data as a JSON response
//       return NextResponse.json(weatherData);
//     } catch (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }