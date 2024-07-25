import { useState, useRef } from 'react'
import Button from "./components/Button";
import useDebounceFn from "@/hooks/useDebounceFn"
import useThrottleFn from "@/hooks/useThrottleFn"
import useMount from './hooks/useMount';
import useUnmount from './hooks/useUnmont';
import useEventListener from './hooks/useEventListener';
import useUnmountedRef from './hooks/useUnmountedRef';
import useFullScreen from './hooks/useFullscreen';
import useLockFn from './hooks/useLockFn';
import { animation } from './utils';

const delay = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, time)
})
function Counter({ count }) {
  const isLive = useUnmountedRef()
  useMount(() => {
    console.log('component mount', isLive.current)
  })
  useUnmount(() => {
    console.log("component unmount", isLive.current)
  })
  return <p>{count}</p>
}
function App() {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)
  const runButRef = useRef()
  const fullRef = useRef()
  const countRef = useRef()
  const { run } = useThrottleFn((p) => {
    console.log(p)
    setCount(count + 1)
  }, {
    wait: 1000
  })
  function handleScroll(e) {
    console.log(e)
  }
  useEventListener('click', handleScroll, { target: () => runButRef.current })
  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen, isEnabled }] = useFullScreen(() => fullRef.current, {
    onExit: () => {
      console.log('退出全屏了', isEnabled)
    },
    onEnter: () => {
      console.log('全屏了', isEnabled)
    }
  })
  function start() {
    animation(3000, 2999, 299, value => {
      countRef.current.textContent = `${value.toFixed(2)}￥`
    })
  }
  const lockFn = useLockFn(async () => {
    await delay(2000)
    console.log('action')
  })
  return (
    <div>
      {visible && <Counter count={count} />}
      <Button type="primary" onClick={() => run(55)} ref={runButRef}>手动触发</Button>
      <Button onClick={() => setVisible(!visible)}>切换</Button>
      <div ref={fullRef} className='bg-white'>
        这是个div box{isFullscreen ? '全屏' : '非全屏'}
        <Button onClick={toggleFullscreen} type="primary">toggleFullscreen</Button>
        <Button onClick={enterFullscreen}>enterFullscreen</Button>
        <Button onClick={exitFullscreen} type="primary">exitFullscreen</Button>
        <span ref={countRef}>2999.00￥</span>
        <Button onClick={start}>START</Button>
        <Button onClick={lockFn}>useLockFn</Button>
      </div>
    </div>
  )
}

export default App
