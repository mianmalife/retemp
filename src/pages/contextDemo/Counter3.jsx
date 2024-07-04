// import { useContext } from "react"
// import { context } from "./Provider"
import Button from "@/components/Button"
import { useSubscribe } from "@/store"

export default function Counter3() {
  // const {counter33, setCounter33} = useContext(context)
  const [counter, setCounter] = useSubscribe("counter3", 0)
  console.log('re-render33')
  function handleClick(){
    setCounter(counter+1)
  } 
  return <div className="bg-slate-800 px-4 py-4">
  <p className="text-white mb-3">{counter}</p>
  <Button type="primary" size="sm" onClick={handleClick}>递增1</Button>
</div>
}