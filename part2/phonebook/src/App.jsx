import { useEffect, useState } from "react";
import personService from "./services/person";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import "../index.css";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [message, setMessage] = useState({ message:null, error: false});

	// Data fetching
	useEffect(() => {
		personService.getAllPerson().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(searchTerm)
	);

	// ======================= ADD PERSON FUNCTION ==========================
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
				// ======================= UPDATE NUMBER FUNCTION ==========================
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
						setMessage({
							message: `Replaced ${existingPersonName.number} with ${returnedPerson.number}`,
						}
						);
						setTimeout(() => {
							setMessage({ message:null, error: false});
						}, 5000);
					})
					.catch(() => {
						// alert(error);
						setMessage({
							message: `Information of ${existingPersonName.name} has already been removed from server`,
							error: true
						});
						setTimeout(() => {
							setMessage({ message: null, error: false });
						}, 5000);
						setPersons(persons.filter((p) => p.id !== existingPersonName.id));
					});
			// ======================= END OF UPDATE NUMBER FUNCTION ==========================

		} else if (
			existingPersonNumber &&
			existingPersonNumber.name !== newPersons.name &&
			newName.trim() !== ""
		) {
			const updatedPerson = { ...existingPersonNumber, name: newName };
			window.confirm(
				`${newNumber} is already added to phonebook, replace the old name with a new one?`
			);

			// ======================= UPDATE NAME FUNCTION ==========================
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
					setMessage(
						{ message: `Replaced ${existingPersonNumber.name} with ${returnedPerson.name}` }
					);
					setTimeout(() => {
						setMessage({ message: null, error: false });
					}, 5000);
				})
				.catch(() => {
					// alert(error);
					setMessage({
						message: `Information of ${existingPersonNumber.name} has already been removed from server`,
						error: true,
					});
					setTimeout(() => {
						setMessage({ message: null, error: false });
					}, 5000);
					setPersons(persons.filter((p) => p.id !== existingPersonNumber.id));
				});
			// ======================= END OF UPDATE NAME FUNCTION ==========================
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
					setNewName("");
					setNewNumber("");
					setMessage({ message: `Added ${newPersons.name} successfully` });
					setTimeout(() => {
						setMessage({ message: null, error: false });
					}, 5000);
				})
				.catch((error) => {
					alert(`${error.message}`);
				});
		}
	};

	// ============== DELETE PERSON ====================
	const deletePerson = (id, name) => {
		window.confirm(`Delete ${name}`) &&
			personService
				.remove(id)
				.then((returnedPersons) => {
					setPersons(persons.filter((n) => n.id !== returnedPersons.id));
					setNewName("");
					setNewNumber("");
					setMessage({ message: `Deleted ${name} successfully` });
					setTimeout(() => {
						setMessage({ message: null, error: false });
					}, 5000);
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
			<Notification message={message.message} error={message.error} />
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
