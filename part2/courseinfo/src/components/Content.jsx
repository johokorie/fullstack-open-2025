import Part from "./Part";
import Total from "./Total";
const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} parts={part.name} exercises={part.exercises} />
			))}
			<Total
				exercises={parts}
			/>
		</div>
	);
};

export default Content;
