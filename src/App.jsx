import { useState } from 'react'
import Button from "./components/Button";
import useDebounceFn from "@/hooks/useDebounceFn"

function App() {
  const [count, setCount] = useState(0)
  const { run } = useDebounceFn((p) => {
    console.log(p)
    setCount(count + 1)
  }, {
    wait: 500
  })
  return (
    <>
      <p>{count}</p>
      <Button type="primary" onClick={() => run(55)}>手动触发</Button>
    </>
  )
}

export default App
