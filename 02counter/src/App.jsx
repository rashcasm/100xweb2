import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(9)
  function handleAdd() {
    setCount(count + 1)
  }
  function handleRemove() {
    setCount(count - 1)
  }
  return (
    <>
      <h2>Trial react</h2>
      <h3>Counter value: {count}</h3>
      <button onClick={handleAdd}>Add value</button> <br />
      <button onClick={handleRemove}>Remove value</button>
    </>
  )
}

export default App
