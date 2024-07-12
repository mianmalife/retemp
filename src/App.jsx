import { useRef } from "react"
import useMouse from "./hook/useMouse"

function App() {
  const demoRef = useRef()
  const { pageX, pageY, clientX, clientY, screenX, screenY, elementX, elementY, elementW, elementH, elementPosX, elementPosY } = useMouse(() => demoRef.current)
  return (
    <>
      <div className="bg-slate-300 w-[300px] h-[300px] m-6" ref={demoRef}>
        <div>pageX: {pageX}, pageY: {pageY}</div>
        <div>clientX: {clientX}, clientY: {clientY}</div>
        <div>screenX: {screenX}, screenY: {screenY}</div>
        <div>x: {elementX}, y: {elementY}</div>
        <div>w: {elementW}, h: {elementH}</div>
        <div>px: {elementPosX}, py: {elementPosY}</div>
      </div>
    </>
  )
}

export default App
