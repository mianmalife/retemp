import { Context } from './Provider'
import Button from "@/components/Button"

export default function Counter1() {
  console.log('re-render11')
  return <div className="bg-slate-400 px-4 py-4">
    <Context.Consumer>
      {({counter11, setCounter11}) => <>
        <p className="text-white mb-3">{counter11}</p>
        <Button type="primary" size="sm" onClick={() => setCounter11(counter11+1)}>递增1</Button>
      </>}
    </Context.Consumer>
  </div>
}