import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";


const App = () => {
  const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');



const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(searchTerm)
 );


 const addPersons = (event) => {
		event.preventDefault();

		const newPersons = {
			name: newName,
			number: newNumber,
		};

		const existingPerson = persons.find(
			(person) =>
				person.name === newPersons.name || person.number === newPersons.number
		);

		//  Checks if both or any field is empty
		const emptyField = () => newName.trim() === "" || newNumber.trim() === "";

		if (existingPerson) {
			alert(`${newName} ${newNumber} is already added to phonebook`);
		} else if (emptyField) {
			//  alerts if both or any field is empty
			if (newName.trim() === "" && newNumber.trim() === "") {
				alert("The name and number field can not be empty");
			} else if (newName.trim() === "") {
				alert("The name field can not be empty");
			} else if (newNumber.trim() === "") {
				alert("The number field can not be empty");
			}
			//  return emptyFieldAlert;
		} else {
			setPersons(persons.concat(newPersons));
			setNewName("");
			setNewNumber("");
		}
 };


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
	setSearchTerm(event.target.value.toLowerCase());
  }

  return (
		<div>
			<h2>Phonebook</h2>
			<Filter type="text" value={searchTerm} onChange={handleSearchChange} />

		  	<PersonForm addPersons={addPersons} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber}  />

			<Persons filteredPersons={filteredPersons} />
		</div>
	);
}

export default App;