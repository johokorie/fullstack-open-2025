import { useState } from "react"
import Person from "./components/Person"

const App = () => {
  const [persons, setPersons] = useState([{name: "Arto Hellas", number: "040-123456"}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPersons = (event) => {
    event.preventDefault()
    const newPersons = {
      name: newName,
      number: newNumber
    }


    if (
			persons.find(
				(person) =>
					person.name === newPersons.name || person.number === newPersons.number
			)
		) {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input type="tel" value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => <Person key={person.name} person={person}/>)}

      </div>
    </div>
  )
}

  export default App;