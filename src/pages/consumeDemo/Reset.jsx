import { Context } from "./Provider"
import Button from "@/components/Button"

export default function ResetCmp() {
  console.log('re-render reset')
  const reset = (setCounter11, setCounter22) => {
    setCounter11(0)
    setCounter22(0)
  }
  return <div className="px-4 py-4">
    <Context.Consumer>
      {({setCounter11, setCounter22, setCounter33}) => <>
        <Button type="primary" size="sm" onClick={() => reset(setCounter11, setCounter22) }>重置12</Button>
        <Button type="primary" size="sm" onClick={() => setCounter33(0)}>重置3</Button>
      </>}
    </Context.Consumer>
</div>
}