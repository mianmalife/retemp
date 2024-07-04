// import { useContext } from "react"
// import { context } from "./Provider"
import Button from "@/components/Button"
import { useDispatch } from "@/store"

export default function ResetCmp() {
  // const {setCounter33} = useContext(context)
  const setCounter11 = useDispatch("counter1")
  const setCounter22 = useDispatch("counter2")
  const setCounter33 = useDispatch("counter3")
  console.log('re-render reset')
  function reset(){
    setCounter11(0)
    setCounter22(0)
  } 
  function handleClick() {
    setCounter33(0)
  }
  return <div className="px-4 py-4">
  <Button type="primary" size="sm" onClick={reset}>重置12</Button>
  <Button type="primary" size="sm" onClick={handleClick}>重置3</Button>
</div>
}