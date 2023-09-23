import { useEffect, useState } from "react"

import countryService from '../services/countries'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const languages = Object.values(country.languages)
  const flag = country.flags.png
  const capital = country.capital
  const [lat, lon] = [...country.capitalInfo.latlng]

  const weatherNow = () => {
    countryService
      .getWeather(lat, lon)
      .then(weatherData => {
        setWeather(weatherData)
      })
  }

  useEffect(weatherNow, [])

  if (!weather) {
    return null
  }

  const temp = weather.main.temp
  const windSpeed = weather.wind.speed
  const icon = weather.weather[0].icon
  const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>capital {capital}</div>
      <div>area {country.area}</div>

      <h3>languages</h3>

      <ul>
        {languages.map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <div>
        <img src={`${flag}`} />
      </div>

      <h2>Weather in {capital}</h2>

      <div>temperature {temp} Celsius</div>

      <div>
        <img src={weatherIcon} />
      </div>

      <div>wind {windSpeed} m/s</div>
    </div>
  )
}

export default Country;
