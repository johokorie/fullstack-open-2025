import { useState } from "react"
import Person from "./components/Person"

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPersons = (event) => {
    event.preventDefault()
    const newPersons = {
      name: newName,
    }


    if (persons.find((person) => person.name === newPersons.name)) {
      alert(`${newName} is already added to phonebook`);
    } else if (newName.trim() !== "") {
      setPersons(persons.concat(newPersons));
      setNewName("");
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange}/>
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