import { useState, useEffect } from 'react'
import countryService from './service/country'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountryList'


const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)


  // Fetch all country and begin filtering when a filter is specifiedn
  useEffect(() => {
    if (filter) {
      countryService.getAllCountries().then((initialCountries) => {
        const filtered = initialCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
        setCountries(filtered)
        setSelectedCountry(null)
        if (filtered.length === 1) {
          setCountry(filtered[0].name.common)
        } else {
          setCountry(null)
        }
      }).catch((error) => console.log(`Error fetching countries: ${error.message}`))
    }
  }, [filter])




  useEffect(() => {
    if (country) {
      countryService.getCountry(country).then((countryData) => {
        setSelectedCountry(countryData)
        console.log('Country selected:', countryData)
      }).catch((error) => console.log(`Error fetching country details: ${error.message}`))
    }
  }, [country])




  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }


  return (
    <div>
      <div>
        <span>find countries </span>
        <input type='text' value={filter} onChange={handleFilter} />
      </div>

      <div>
        {
          countries.length === 0 || filter.length === 0
            ? (<p>Specify a filter to find a match</p>)
            : countries.length === 1
              ? (<CountryDetails country={selectedCountry} />)
              : countries.length > 10
                ? (<p>Too many matches, specify another filter</p>)
                : (<CountryList countries={countries} />)
        }
      </div>

    </div>

  )
}

export default App
