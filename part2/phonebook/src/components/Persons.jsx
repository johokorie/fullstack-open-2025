import Person from "./Person";
const Persons = ({ filteredPersons }) => {
	return (
		<div>
			<h2>Numbers</h2>
			{filteredPersons.map((person) => (
				<Person key={person.name} person={person} />
			))}
		</div>
	);
};

export default Persons;
