import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("")

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  return (
    <>
      <h2>Count Number of Characters in Input</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <p>Word Count: {inputValue.length}</p>
    </>
  )
}

export default App
