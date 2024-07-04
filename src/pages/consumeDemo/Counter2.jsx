import { Context } from "./Provider"
import Button from "@/components/Button"

export default function Counter2() {
  console.log('re-render22')
  return <div className="bg-slate-500 px-4 py-4">
  <Context.Consumer>
  {({counter22, setCounter22}) => <>
    <p className="text-white mb-3">{counter22}</p>
  <Button type="primary" size="sm" onClick={() =>setCounter22(counter22+1) }>递增1</Button>
  </>}
  </Context.Consumer>
</div>
}