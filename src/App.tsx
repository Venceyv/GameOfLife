import { useState } from 'react'
import './App.css'

function useGoLState() {
  const [GoLBoard, setGoLBoard] = useState(() => {
    const board = [];
    for(let i = 0; i < 100; i++) {
      board.push(new Array(100).fill);
    }

    return board;
  })
  
  return [GoLBoard, setGoLBoard]
}

function App() {
  const [GoLBoard, setGoLBoard] = useGoLState()

  return (
    
  )
}

export default App
