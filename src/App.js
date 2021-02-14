import './App.css';
import Routing from './Components/Routing'
import { useState } from 'react';

function App() {

  const [toggle, setToggle] = useState(true);

  const toggleTheme = () => {

    if(toggle){
      document.body.classList.add('dark');
    }
    else{
      document.body.classList.remove('dark');
    }
    setToggle(!toggle);
  }
  return (
    <>
     <button onClick={toggleTheme} className="ml-5 mt-4">Toggle Theme</button>
      <Routing />
    </>
  );
}

export default App;