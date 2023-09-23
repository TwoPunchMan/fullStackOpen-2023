import Country from "./Country";

const ListCountries = ({ countries, showCountry }) => {
  if (!countries) {
    return (<div></div>)
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country => {
          const name = country.name.common
          return (
            <div key={name}>
              {name}
              <button onClick={() => showCountry(name)}>show</button>
            </div>
          )}
        )}
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
}

export default ListCountries;
