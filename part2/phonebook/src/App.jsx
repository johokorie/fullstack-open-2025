import { useEffect, useState } from "react";
import personService from "./services/person";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	// Data fetching
	useEffect(() => {
		personService.getAllPerson().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

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
				person.name === newPersons.name && person.number === newPersons.number
		);
		const existingPersonName = persons.find(
			(person) =>
				person.name === newPersons.name && person.number !== newPersons.number
		);
		const existingPersonNumber = persons.find(
			(person) =>
				person.number === newPersons.number && person.name !== newPersons.name
		);

		//  Checks and alert if both or any field is empty else create a new person
		if (existingPerson) {
			alert(`${newName} ${newNumber} is already added to phonebook`);
		} else if (
			existingPersonName &&
			existingPersonName.number !== newPersons.number &&
			newNumber.trim() !== ""
		) {
			const updatedPerson = { ...existingPersonName, number: newNumber };
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			) &&
				// update number function
				personService
					.update(updatedPerson.id, updatedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== existingPersonName.id ? person : returnedPerson
							)
						);
						setNewName("");
						setNewNumber("");
					})
					.catch((error) => {
						alert(error);
						setPersons(persons.filter((p) => p.id !== existingPersonName.id));
					});
		} else if (
			existingPersonNumber &&
			existingPersonNumber.name !== newPersons.name &&
			newName.trim() !== ""
		) {
			const updatedPerson = { ...existingPersonNumber, name: newName };
			window.confirm(
				`${newNumber} is already added to phonebook, replace the old name with a new one?`
			);

			// Update name function
			personService
				.update(updatedPerson.id, updatedPerson)
				.then((returnedPerson) => {
					setPersons(
						persons.map((person) =>
							person.id !== existingPersonNumber.id ? person : returnedPerson
						)
					);
					setNewName("");
					setNewNumber("");
				})
				.catch((error) => {
					alert(error);
					setPersons(persons.filter((p) => p.id !== existingPersonName.id));
				});
		} else if (newName.trim() === "" && newNumber.trim() === "") {
			alert("The name and number field can not be empty");
		} else if (newName.trim() === "") {
			alert("The name field can not be empty");
		} else if (newNumber.trim() === "") {
			alert("The number field can not be empty");
		} else {
			personService
				.create(newPersons)
				.then((returnedPersons) => {
					setPersons(persons.concat(returnedPersons));
				})
				.catch((error) => {
					alert(`${error.message}`);
				});
		}
	};

	const deletePerson = (id, name) => {
		window.confirm(`Delete ${name}`) &&
			personService
				.remove(id)
				.then((returnedPersons) => {
					setPersons(persons.filter((n) => n.id !== returnedPersons.id));
					setNewName("");
					setNewNumber("");
				})
				.catch((error) => {
					alert(`${error.message}`);
				});
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter type="text" value={searchTerm} onChange={handleSearchChange} />

			<PersonForm
				addPersons={addPersons}
				newName={newName}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newNumber={newNumber}
			/>

			<Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
