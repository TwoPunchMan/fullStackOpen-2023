import axios from "axios";
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const api_key = import.meta.env.VITE_API_KEY
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getAllCountries = () => {
  const request = axios.get(`${countriesUrl}/all`)
  return request.then(res => res.data)
}

const getCountry = (country) => {
  const request = axios.get(`${countriesUrl}/name/${country}`)
  return request.then(res => res.data)
}

const getWeather = (lat, lon) => {
  const request = axios.get(`${weatherUrl}\lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
  return request.then(res => res.data)
}

export default {
  getAllCountries,
  getCountry,
  getWeather
}
