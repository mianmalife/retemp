import { useState, useRef } from 'react'
import Button from "./components/Button";
import useDebounceFn from "@/hooks/useDebounceFn"
import useMount from './hooks/useMount';
import useUnmount from './hooks/useUnmont';
import useEventListener from './hooks/useEventListener';

function Counter({ count }) {
  useMount(() => {
    console.log('component mount')
  })
  useUnmount(() => {
    console.log("component unmount")
  })
  return <p>{count}</p>
}
function App() {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)
  const runButRef = useRef()
  const { run } = useDebounceFn((p) => {
    console.log(p)
    setCount(count + 1)
  }, {
    wait: 500
  })
  function handleScroll(e) {
    console.log(e)
  }
  useEventListener('click', handleScroll, { target: () => runButRef.current })
  return (
    <>
      {visible && <Counter count={count} />}
      <Button type="primary" onClick={() => run(55)} ref={runButRef}>手动触发</Button>
      <Button onClick={() => setVisible(!visible)}>切换</Button>
    </>
  )
}

export default App
