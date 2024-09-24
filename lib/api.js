// Function to fetch the JSON list of all available zip codes
export async function getZipCodes() {
    // Unavailable zips through the weather API
    const excludedZipCodes = [
        4244, 4245, 4305, 4942, 4945, 
        5601, 5602, 5603, 5943, 5965, 
        6210, 8789, 8799
      ];
    // Assuming this reads from a local JSON file containing valid zip codes
    const res = await fetch(`https://api.dataforsyningen.dk/postnumre/`); 
    if (!res.ok) {
      throw new Error('Failed to fetch zip codes');
    }
    const zipCodes = await res.json(); // Assuming the API returns an array of zip codes
    const filteredZipCodes = zipCodes.filter((zip) => {
        const zipAsInt = parseInt(zip.nr)
        return (zipAsInt === 1050 || zipAsInt === 1550 || zipAsInt === 1800 || zipAsInt > 1999) && !excludedZipCodes.includes(zipAsInt);
    })
    return filteredZipCodes;
}

export async function getLocationData(lon, lat) {
    const res = await fetch(`https://api.dataforsyningen.dk/postnumre/reverse?x=${lon}&y=${lat}`);
    const data = await res.json();
    return data;
}

const OWM_GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0/zip';
const OWM_DATA_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const API_KEY = process.env.OWM_API;

export async function getGeoData(zip) {
    const res = await fetch(`${OWM_GEO_BASE_URL}?zip=${zip},DK&units=metric&appid=${API_KEY}`);
    // Check if latitude and longitude are provided
    if (!res.ok) {
        throw new Error('Failed to fetch lat/long from Geo API');
    }
  
    const geoData = await res.json();
    return {
      lat: geoData.lat,
      lon: geoData.lon,
    };
}

export async function getWeatherData(lat, lon) {
    const res = await fetch(`${OWM_DATA_BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely,daily&units=metric&appid=${API_KEY}`);

    if(!res.ok) {
        throw new Error('Failed to fetch weather data based on lat and lon');
    }

    const weatherData = await res.json();
    return weatherData;
}