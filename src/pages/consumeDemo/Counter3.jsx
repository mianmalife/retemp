import { Context } from "./Provider"
import Button from "@/components/Button"

export default function Counter3() {
  console.log('re-render33')
  return <div className="bg-slate-800 px-4 py-4">
    <Context.Consumer>
      {({counter33, setCounter33}) => <>
        <p className="text-white mb-3">{counter33}</p>
        <Button type="primary" size="sm" onClick={() =>setCounter33(counter33+1) }>递增1</Button>
      </>}
    </Context.Consumer>
</div>
}