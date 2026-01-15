import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [Jokes, setJokes] = useState([])
  const [User, setUser] = useState(null)


  useEffect(() => {

  axios.get('/api/jokes')
    .then((response) => {
      setJokes(response.data)
    })
    .catch((error) => {
      console.error('Error fetching jokes:', error);
    });
    },[]);


    useEffect(() => {
    axios.get('/hello/me').then((response) => {
          setUser(response.data)
    }).catch((error) => {
        console.error('Error fetching user data:', error);
    },[])
    })




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


        <h1>User Information:</h1>

        {User && User.map((info) => (
          <div key={info.type}>
            <h3>{info.type} {info.ans}</h3>
          </div>
        ))}
    </>
  )
}

export default App
