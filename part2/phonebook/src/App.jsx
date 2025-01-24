import { useState } from "react";
import Person from "./components/Person";

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
	 event.preventDefault()

	 const newPersons = {
		name: newName,
      	number: newNumber
    }

	 const existingPerson = persons.find((person) => (person.name === newPersons.name ||(person.number === newPersons.number)));



	 if (existingPerson) {
			alert(`${newName} ${newNumber} is already added to phonebook`);
		} else if (newName.trim() !== "" && newNumber.trim() !== "") {
			setPersons(persons.concat(newPersons));
			setNewName("");
			setNewNumber("");
		}
  }


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
			<div>
				filter shown with{" "}
				<input type="text" value={searchTerm} onChange={handleSearchChange} />
			</div>

			<form onSubmit={addPersons}>
				<h2>add a new</h2>

				<div>
					name: <input type="text" value={newName} onChange={handleNameChange} />
				</div>

				<div>
					number: <input type="tel" value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<div>
				<h2>Numbers</h2>
				{filteredPersons.map((person) => (
					<Person key={person.name} person={person} />
				))}
			</div>
		</div>
	);
}

export default App;