import Person from "./Person";
const Persons = ({ filteredPersons, deletePerson }) => {
	return (
		<div>
			<h2>Numbers</h2>
			{filteredPersons.map((person) => (
				<Person key={person.id} name={person.name} number={person.number} deletePerson={deletePerson} id={person.id} />
			))}
		</div>
	);
};

export default Persons;
