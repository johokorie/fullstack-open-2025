import Part from "./Part";
const Content = ({ course }) => {
	return (
		<div>
			{course.parts.map((part) => (
				<Part key={part.id} parts={part.name} exercises={part.exercises} />
			))}
		</div>
	);
};

export default Content;
