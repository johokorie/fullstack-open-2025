const Total = ({ parts }) => {
    const total = parts.reduce((sum, parts) => sum + parts.exercises, 0);
  return (
		<div>
			<strong>total of {total} exercises</strong>
		</div>
	);
}

export default Total