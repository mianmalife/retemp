import { useState, useEffect, useRef, useReducer } from "react"
import useFetch from "@/hook/useFetch"
import { v4 as uuidv4 } from 'uuid'
import TaskItem from "./TaskItem"
import BirdTabItem from "./BirdTabItem"
import BirdList from './BirdList'
import ErrorComp from "@/components/ErrorComp"
import LottieSpin from "../../components/LottieSpin"

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { task } = action.payload
      return [...state, { name: task, isComplete: false, id: uuidv4(), showInput: false }]
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
    case 'edit': {
      const { id } = action.payload
      return state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            showInput: true
          }
        } else {
          return item
        }
      })
    }
    case 'sure_edit': {
      const { id, value } = action.payload
      return state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: value,
            showInput: false
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
  const [active, setActive] = useState('person role')
  const taskInputRef = useRef()
  const {loading, data, error} = useFetch(`https://emojihub.yurace.pro/api/all/group/${active}`)
  useEffect(() => {
    taskInputRef.current.focus()
  }, [])
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
  function handleEdit(id) {
    dispatch({ type: 'edit', payload: { id } })
  }
  function handleSureEdit(id, newValue) {
    console.log(id, newValue);
    if (!newValue) return
    dispatch({ type: 'sure_edit', payload: { id, value: newValue } })
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
              <TaskItem listItem={item} id={item.id} key={item.id} handleComplete={handleComplete} handleDelete={handleDelete} handleEdit={handleEdit} handleSureEdit={handleSureEdit} />
            ))
          }
        </ul>
      </div>
      <div className="shadow-sm hover:shadow-xl transition-all rounded-md border border-gray-100 p-2">
        <ul className="flex items-center fsizes-14">
          {group.map(item => <BirdTabItem key={item} item={item} active={active} handleTabItem={handleTabItem} />)}
        </ul>
        {!loading && !error && <ul className="divide-y h-80 overflow-y-auto">
          <BirdList data={data || []} />
        </ul>}
        {!loading && error && <ErrorComp error={error} />}
        { loading && <LottieSpin />}
      </div>
    </div>
  )
}

export default Demo
