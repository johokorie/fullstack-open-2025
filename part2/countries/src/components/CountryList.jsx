const CountryList = ({ countries, handleCountryShow }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common} {" "}
          <button onClick={() => handleCountryShow(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList