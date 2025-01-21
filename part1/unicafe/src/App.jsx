import { useState } from 'react'

const Statistics = (props) => {
  return props.total ? (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.percentage} />
        </tbody>
      </table>
    </>
	) : (
		<div>
			<h1>statistics</h1>
			<p>No feedback given</p>
		</div>
	);
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text} </td>
        <td>{props.value}</td>
      </tr>


		// <p>
		// 	{props.text} {props.value}{" "}
		// </p>
	);
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const total = good + neutral + bad
  const average = total && (good - bad) / total
  const percentage = `${total && (good / total) * 100}%`;

const handleGoodClick = () => {
	const updatedGood = good + 1;
  setGood(updatedGood);
};
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
};
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick}  text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad" />

     <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} percentage={percentage} />
    </div>
  )
}

export default App
