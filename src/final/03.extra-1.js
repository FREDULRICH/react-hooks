// Lifting state
// 💯 colocating state
// http://localhost:3000/isolated/final/03.extra-1.js


import * as React from 'react'

function Name({leNom, setLeNom}) {
  
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input   id="name"   value={leNom}   onChange={(event) =>setLeNom (event.target.value) }
      />
      <button onClick={()=> setLeNom('')} > appuyez </button> 
    </div>
  )
}

function FavoriteAnimal({animal, setAnimal}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={ (event) => setAnimal (event.target.value)} />
    </div>
  )
}

function Display({animal, leNom}) {
  return <div>{`Your name is ${leNom} Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')
  const [leNom, setLeNom] = React.useState('')

  return (
    <div>
      <Name leNom={leNom} setLeNom={setLeNom} />

      <FavoriteAnimal
        animal={animal}  setAnimal ={setAnimal}
      />

      <Display animal={animal} leNom ={leNom} />
    </div>
  )
}

export default App
