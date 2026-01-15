import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [Jokes, setJokes] = useState([])


  useEffect(() => {

  axios.get('/api/jokes')
    .then((response) => {
      setJokes(response.data)
    })
    .catch((error) => {
      console.error('Error fetching jokes:', error);
    });
    },[]);




  return (
    <>
        <h1>Full Stack Jokes</h1>

        <h1>Jokes: {Jokes.length}</h1>
{
        Jokes.map((joke) => 
          <div key={joke.id}> 
            <h2>{joke.title}</h2>
            <p>{joke.joke}</p>
          </div>
        )
}
    </>
  )
}

export default App
