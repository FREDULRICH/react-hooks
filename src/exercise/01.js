// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import { useState } from 'react'

function Greeting() {
  // 💣 delete this variable declaration and replace it with a React.useState call
  //ok
  const [name , setName]= useState ('Kodi');

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName (event.target.value.toLowerCase() )
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App