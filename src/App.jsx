import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [gameStart, setGameStart] = useState(false)
  const [restart, setRestart] = useState(false)

  function startGame(){
    setGameStart(prevState => !prevState)
  }

  return (
    <div className="App">
      {/* if gameStart === false, render start */}
      {!gameStart && <Start startGame={startGame}/>}
      {/* once gameStart === true, render quiz */}
    </div>
  )
}

export default App
