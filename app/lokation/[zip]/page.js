// Import necessary modules
import { notFound } from 'next/navigation'; // To handle 404 if needed
import { getZipCodes, getGeoData, getWeatherData } from '@/lib/api';

export async function generateStaticParams() {
    const zipCodes = await getZipCodes();  // Get all the zip codes
  
    // Map each zip code into a format that corresponds to the dynamic [zip] route
    return zipCodes.map((zipData) => ({
      zip: zipData.nr,  // Corresponds to the dynamic [zip] route
    }));
  }

export default async function LocationPage({ params }) {
  const { zip } = params;

  // Get the list of valid zip codes
  const zipCodes = await getZipCodes();
  const zipNr = zipCodes.map(zipData => zipData.nr)

  // If the zip code is invalid, show a 404 page
  if (!zipNr.includes(zip)) {
    notFound();  // This will trigger a 404 page if the zip is invalid
  }

  // Fetch the UV index for the specific zip code
  const { lat, lon } = await getGeoData(zip)
  const weatherData = await getWeatherData(lat, lon);
  const hourlyWeatherData = weatherData.hourly
  const currentZip = zipCodes.find((z) => z.nr === zip);
  const currentName = currentZip.navn;

  return (
    <>      
      <h1>UV indeks {currentName} i dag</h1>
      <p>Du kan herunder se dagens UV-indeks. Der er lige nu {weatherData.current.temp} grader,
      en luftfugtighed på {weatherData.current.humidity}%,
      og det blæser med {weatherData.current.wind_speed} meter i sekundet i {currentName}.
      Lige nu er UV-indekset {weatherData.current.uvi >= 3 ? "over 3.0, så vi anbefaler at du bruger solcreme eller holder dig i skyggen" : "under 3.0, så du behøver ikke solcreme og kan godt opholde dig i solen"}.</p>
      <h2>Nuværende UV-indeks</h2>
      <p className="uv-index">{weatherData.current.uvi}</p>
      <h2>UV-indeks i {currentName} de kommende 48 timer</h2>
      <table>
        <thead>
            <tr>
                <th>Tid</th>
                <th>Indeks</th>
            </tr>
        </thead>
        <tbody>
        {hourlyWeatherData.map((hour, index) => {
            const currentHour = new Date(hour.dt * 1000).getHours()
            return (
                <tr key={index}>
                    <td>{currentHour}-{currentHour+1}</td>
                    <td>{hour.uvi}</td>
                </tr>
            )}
        )}
        </tbody>
      </table>
    </>
  )
}
