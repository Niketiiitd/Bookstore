import axios from 'axios';
import { useEffect } from 'react';
import Homepage from './components/Homepage';
import './index.css';
function App() {
  useEffect(()=>{
    axios.get('http://localhost:7777')
    .then((response) => {
      console.log("Connection successful");
    })
    .catch((error) =>{
      console.log(error)
    })

  },[]);
  
  return (
    
    <div className='italic'>
      {/* <h1 className='text-black'>Hello!</h1> */}
      <Homepage />
    </div>
)};

export default App
