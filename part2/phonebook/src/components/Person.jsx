const Person = ({ name, number, deletePerson, id }) => {
	return (
		<p>
			{name} {number}
			<button onClick={() => deletePerson(id, name)}>delete</button>
		</p>
	);
};

export default Person;
