import { useState, useEffect, useRef, useReducer, Suspense, lazy } from "react"
import { v4 as uuidv4 } from 'uuid'
import TaskItem from "./TaskItem"
import BirdTabItem from "./BirdTabItem"
import BirdList from './BirdList'
import LottieSpin from "../../components/LottieSpin"
import loadingUrl from './loading.json?url'

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
      return [...state, { name: task, isComplete: false, id: uuidv4() }]
    }
    case 'delete': {
      const { id } = action.payload
      return state.filter((item) => item.id !== id)
    }
    case 'complete': {
      const { id } = action.payload
      return state.map((item) => {
        if (item.id === id) {
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
  const taskRef = useRef('')
  const [taskList, dispatch] = useReducer(reducer, [])
  const [birdList, setBirdList] = useState([])
  const [active, setActive] = useState('person role')
  const [loading, setLoading] = useState(true)
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
      if (!taskRef.current.trim()) return
      dispatch({ type: 'add', payload: { task: taskRef.current } })
      taskRef.current = ''
      taskInputRef.current.value = ''
    }
  }
  function handleDelete(id) {
    dispatch({ type: 'delete', payload: { id } })
  }
  function handleComplete(id) {
    dispatch({ type: 'complete', payload: { id } })
  }
  function handleTabItem(name) {
    setActive(name)
  }
  return (
    <div className="flex flex-col m-2 gap-y-2">
      <div className="shadow-sm hover:shadow-xl transition-all rounded-md border border-gray-100 p-2">
        <input type="text"
          className="text-sm w-80 h-10 mb-4 border-[1px] px-3 outline-none border-gray-300 rounded-md bg-white hover:border-blue-100 focus:border-blue-100 active:border-blue-300"
          placeholder="新增一个任务"
          onChange={e => taskRef.current = e.target.value}
          onKeyUp={handleKeyUp}
          ref={taskInputRef} />
        <ul className="text-sm divide-y divide-slate-100">
          {
            taskList.map((item) => (
              <TaskItem listItem={item} id={item.id} key={item.id} handleComplete={handleComplete} handleDelete={handleDelete} />
            ))
          }
        </ul>
      </div>
      <div className="shadow-sm hover:shadow-xl transition-all rounded-md border border-gray-100 p-2">
        <ul className="flex items-center fsizes-14">
          {group.map(item => <BirdTabItem key={item} item={item} active={active} handleTabItem={handleTabItem} />)}
        </ul>
        {!loading ? <ul className="divide-y">
          {/* <Suspense fallback={<Loading />}>
            <LayzBirdList data={birdList} />
          </Suspense> */}
          <BirdList data={birdList} />
        </ul> : <LottieSpin path={loadingUrl} />}
      </div>
    </div>
  )
}

export default Demo
