// import { createContext, useState } from "react";

// const initialState = {
//   counter11: 0,
//   counter22: 0,
//   counter33: 0
// }
// export const context = createContext(initialState)

export default function Provider(props) {
  // const [state, setState] = useState(initialState)

  // const value = {
  //   ...state,
  //   setCounter11: v => setState({...state, counter11: v}),
  //   setCounter22: v => setState({...state, counter22: v}),
  //   setCounter33: v => setState({...state, counter33: v})
  // }
  return <div>
    {props.children}
  </div>
}