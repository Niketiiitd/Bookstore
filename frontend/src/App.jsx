import { useState } from 'react'
import Homepage from './components/Homepage'
import './index.css'
function App() {
  const [count, setCount] = useState(0)
  
  return (
    
    <div className='italic'>
      {/* <h1 className='text-black'>Hello!</h1> */}
      <Homepage />
    </div>
)};

export default App
