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

    setPersons(persons.concat(newPersons));
    setNewName("");
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
      <ul>
        {persons.map((person) => <Person key={person.name} person={person}/>)}

      </ul>
    </div>
  )
}

export default App