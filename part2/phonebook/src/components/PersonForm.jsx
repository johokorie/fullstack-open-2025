const PersonForm = ({ handleNameChange, handleNumberChange, addPersons, newName, newNumber}) => {
  return (
		<form onSubmit={addPersons}>
			<h2>add a new</h2>

			<div>
				name: <input type="text" value={newName} onChange={handleNameChange} />
			</div>

			<div>
				number:{" "}
				<input type="tel" value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}

export default PersonForm