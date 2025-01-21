import { useState } from 'react'

const Statistics = (props) => {
  return (
		<div>
			<h1>statistics</h1>
			<p> good {props.good}</p>
			<p> neutral {props.neutral}</p>
			<p> bad {props.bad}</p>
			<p> all {props.total}</p>
			<p> average {props.average}</p>
			<p> positive {props.percentage}%</p>
		</div>
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
  const percentage = total && (good / total) * 100;

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
