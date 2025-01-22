const Total = ({ exercises }) => {
  return (
		<div>
			<strong>total of {exercises[0].exercises + exercises[1].exercises + exercises[2].exercises + exercises[3].exercises} exercises</strong>
		</div>
	);
}

export default Total