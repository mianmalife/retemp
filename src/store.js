import { useState } from "react"

let isInitStore = {}
const store = {}

function _setValue(key, value) {
  store[key].value = value
  store[key].dispatch.forEach(cb => {
    cb(value)
  })
}

export function useSubscribe(key, value) {
  const [state, setState] = useState(value)
  if (!isInitStore[key]) {
    store[key] = { value: value, dispatch: new Set()}
    isInitStore[key] = true
  }

  if (store[key].dispatch.has(setState) === false) {
    store[key].dispatch.add(setState)
  }
  return [state, _value => _setValue(key, _value)]
}

export function useDispatch(key) {
  return value => _setValue(key, value)
}