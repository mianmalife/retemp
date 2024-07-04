import { createContext, useState } from "react";

export const Context = createContext()

export default function Provider(props) {
  const [counter11, setCounter11] = useState(0)
  const [counter22, setCounter22] = useState(0)
  const [counter33, setCounter33] = useState(0)

  const value = {
    counter11,
    counter22,
    counter33,
    setCounter11,
    setCounter22,
    setCounter33
  }
  return <Context.Provider value={value}>
    {props.children}
  </Context.Provider>
}