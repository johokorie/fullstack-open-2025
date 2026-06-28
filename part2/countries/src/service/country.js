import axios, { AxiosError } from "axios";

const allCountry = "https://studies.cs.helsinki.fi/restcountries/api/all";
const singleCountry = "https://studies.cs.helsinki.fi/restcountries/api/name";


const getAllCountries = () => {
	const request = axios.get(allCountry);
	return request
		.then((response) => response.data)
		.catch((error) => {
			if (error instanceof AxiosError) {
				console.error(`Error fetching countries: ${error.message}`);
			} else {
				console.error(`Unexpected error: ${error}`);
			}
			throw error;
		});
};

const getCountry = (countryName) => {
	const request = axios.get(`${singleCountry}/${countryName}`);
	return request
		.then((response) => response.data)
		.catch((error) => {
			if (error instanceof AxiosError) {
				console.error(`Error fetching country: ${error.message}`);
			} else {
				console.error(`Unexpected error: ${error}`);
			}
			throw error;
		});
};


export default { getAllCountries, getCountry };
