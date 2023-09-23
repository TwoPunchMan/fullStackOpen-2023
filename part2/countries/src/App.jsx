import { useState, useEffect } from 'react'

import ListCountries from './components/ListCountries'

import countryService from './services/countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(countries => {
        setCountries(countries)
      })
      .catch(error =>{
        console.log("Countries data not loaded yet.")
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = search
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : null

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
        <ListCountries countries={countriesToShow} showCountry={setSearch} />
      </div>
    </div>
  )
}

export default App
