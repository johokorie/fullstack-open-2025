const CountryDetails = ({ country, weather }) => {
  if (!country) {
    return null; // Return null if country is not provided
  }

  const languages = Object.values(country.languages || {});

  return (
    <div>
      <div>

        <h1>{country.name.common}</h1>

        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      </div>

      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather?.main?.temp || 'N/A'} Celsius</p>
        <img src={`https://openweathermap.org/payload/api/media/file/${weather?.weather[0]?.icon}.png`} alt="Weather icon" />
        <p>Wind: {weather?.wind?.speed || 'N/A'}m/s</p>
      </div>

    </div>
  );
};



export default CountryDetails;