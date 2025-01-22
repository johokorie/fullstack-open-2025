const Total = ({ exercises }) => {
    const total = exercises.reduce((sum, exercises) => sum + exercises.exercises, 0);
  return (
		<div>
			<strong>total of {total} exercises</strong>
		</div>
	);
}

export default Total