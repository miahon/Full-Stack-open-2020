import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  console.log(props)
  return (
      <tr>
        <td>{props.text} </td>
        <td>{props.value} </td>
      </tr>
            
  )
}



const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad
  const average = ((props.good - props.bad)/all).toFixed(2) 
  const positive = (props.good/all*100).toFixed(1) + " %"

  if (all === 0) {
    console.log(all)
    return (
      <div>
        No feedback given
      </div>
    )
  }
   
  return (
    <div>
      <table>
      <tbody>      
      <StatisticLine text="Good" value ={props.good} />
      <StatisticLine text="Neutral" value ={props.neutral} />
      <StatisticLine text="Bad" value ={props.bad} />
      <StatisticLine text="All" value = {all} />
      <StatisticLine text="Average" value = {average} />
      <StatisticLine text="Positive" value ={positive} />
      </tbody> 
      </table>
    </div>
  )
}



const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>

        <h2>Anna palautetta</h2>
        <Button handleClick={handleGoodClick} text='Good'/>
        <Button handleClick={handleNeutralClick} text='Neutral'/>
        <Button handleClick={handleBadClick} text='Bad'/>

        <h2>Tilastot</h2>
        <Statistics good={good} neutral={neutral} bad={bad}/>
                
      </div>
  )
}


ReactDOM.render(
  <App />, 
  document.getElementById('root')
)

