import { useState, useEffect, useRef, useReducer, Suspense, lazy } from "react"
import TaskItem from "./TaskItem"
import BirdTabItem from "./BirdTabItem"
import BirdList from './BirdList'

// function delayPromise(promise) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(), 2000)
//   }).then(() => promise)
// }

// const LayzBirdList = lazy(() => delayPromise(import("./BirdList")))

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { task } = action.payload
      return [...state, { name: task, isComplete: false }]
    }
    case 'delete': {
      const { id } = action.payload
      return state.filter((item, idx) => idx !== id)
    }
    case 'complete': {
      const { id } = action.payload
      return state.map((item, idx) => {
        if (idx === id) {
          return {
            ...item,
            isComplete: !item.isComplete
          }
        } else {
          return item
        }
      })
    }
  }
}

const group = ['person role', 'animal-bird', 'body', 'objects']
function Demo() {
  const [task, setTask] = useState('')
  const [taskList, dispatch] = useReducer(reducer, [])
  const [birdList, setBirdList] = useState([])
  const [active, setActive] = useState('person role')
  const [loading, setLoading] = useState(false)
  const taskInputRef = useRef()
  useEffect(() => {
    taskInputRef.current.focus()
  }, [])
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true)
        const data = await fetch(`https://emojihub.yurace.pro/api/all/group/${active}`).then(res => res.json())
        setBirdList(data)
      } catch (error) {
        console.warn(error)
        setBirdList([])
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [active])
  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      if (!task.trim()) return
      dispatch({ type: 'add', payload: { task } })
      setTask('')
    }
  }
  function handleTask(e) {
    setTask(e.target.value)
  }
  function handleDelete(index) {
    dispatch({ type: 'delete', payload: { id: index } })
  }
  function handleComplete(index) {
    dispatch({ type: 'complete', payload: { id: index } })
  }
  function handleTabItem(name) {
    setActive(name)
  }
  return (
    <div className="m-5 flex">
      <div>
        <input type="text"
          className="text-sm w-80 h-10 mb-4 border-[1px] px-3 outline-none border-gray-300 rounded-md bg-white hover:border-blue-100 focus:border-blue-100 active:border-blue-300"
          placeholder="新增一个任务"
          value={task}
          onChange={handleTask}
          onKeyUp={handleKeyUp}
          ref={taskInputRef} />
        <ul className="text-sm divide-y divide-slate-100">
          {
            taskList.map((item, index) => (
              <TaskItem listItem={item} index={index} key={index} handleComplete={handleComplete} handleDelete={handleDelete} />
            ))
          }
        </ul>
      </div>
      <div>
        <ul className="flex items-center fsizes-14">
          {group.map(item => <BirdTabItem key={item} item={item} active={active} handleTabItem={handleTabItem} />)}
        </ul>
        {!loading ? <ul className="ml-6 divide-y">
          {/* <Suspense fallback={<Loading />}>
            <LayzBirdList data={birdList} />
          </Suspense> */}
          <BirdList data={birdList} />
        </ul> : <Loading />}
      </div>
    </div>
  )
}

function Loading() {
  return <div>loading...</div>
}

export default Demo
