import { useState, useEffect } from "react";

const initState = {
  pageX: null,
  pageY: null,
  clientX: null,
  clientY: null,
  screenX: null,
  screenY: null,
  elementX: null,
  elementY: null,
  elementW: null,
  elementH: null,
  elementPosX: null,
  elementPosY: null
}
export default function useMouse(eventTarget) {
  const [state, setState] = useState(initState)
  useEffect(() => {
    function handleMove(e) {
      const { pageX, pageY, clientX, clientY, screenX, screenY } = e
      const newState = {
        pageX,
        pageY,
        clientX,
        clientY,
        screenX,
        screenY,
        elementX: null,
        elementY: null,
        elementW: null,
        elementH: null,
        elementPosX: null,
        elementPosY: null
      }
      if (eventTarget) {
        const { left, top, width, height } = eventTarget().getBoundingClientRect()
        newState.elementPosX = left + window.scrollX
        newState.elementPosY = top + window.scrollY
        newState.elementX = e.pageX - newState.elementPosX
        newState.elementY = e.pageY - newState.elementPosY
        newState.elementW = width
        newState.elementH = height
      }
      setState(newState)
    }
    window.addEventListener('mousemove', handleMove, false)
    return () => {
      window.removeEventListener('mousemove', handleMove, false)
    }
  }, [])

  return state
}