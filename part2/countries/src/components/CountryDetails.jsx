const CountryDetails = ({ country}) => {
  if (!country) {
    return null; // Return null if country is not provided
  }

  const languages = Object.values(country.languages || {});

  return (
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
  );
};


export default CountryDetails;