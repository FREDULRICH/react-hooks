// useEffect: persistent state
// 💯 custom hook
// http://localhost:3000/isolated/final/02.extra-3.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = '', initialSurname =''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  const [surname, setSurName] = useLocalStorageState('surname', initialSurname)

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeSurname(event) {
    setSurName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChangeName} id="name" />
        <label htmlFor="surname">Surname: </label>
        <input value={surname} onChange={handleChangeSurname} id="surname" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
