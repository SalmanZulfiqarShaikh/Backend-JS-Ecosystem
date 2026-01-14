import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [Jokes, setJokes] = useState([])

  axios.get('http://localhost:3000/jokes')
    .then((response) => {
      setJokes(response.data)
    })
    .catch((error) => {
      console.error('Error fetching jokes:', error);
    });



  return (
    <>
        <h1>Full Stack Jokes</h1>

        <h1>Jokes: {Jokes.length}</h1>
{
        Jokes.map((joke) => 
          <div key={joke.id}> 
            <h2>{joke.title}</h2>
            <p>{joke.content}</p>
          </div>
        )
}
    </>
  )
}

export default App
