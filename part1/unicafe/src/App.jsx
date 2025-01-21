import { useState } from 'react'


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

  console.log(good, neutral, bad, total);



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick}  text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad" />


      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {percentage}%</p>
    </div>
  )
}

export default App
